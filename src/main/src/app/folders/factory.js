import { getBookmarkTree } from '../browser';

export const buildFolderPaths = ({ nodes, foldersById = {}, prevFolderPaths = [] }) => {
  nodes.forEach(node => {
    const { children, id, title, url } = node;
    if (!url) {
      const folderPaths = title ? [...prevFolderPaths, title] : prevFolderPaths;
      if (folderPaths.length) {
        foldersById[id] = folderPaths.join('.');
      }
      if (children) {
        buildFolderPaths({ nodes: children, foldersById, prevFolderPaths: folderPaths });
      }
    }
  });
  return foldersById;
};

const flattenTree = ({ nodes, prevLevel = 0, prevLineage = [], bookmarksById = {} }) => {
  const level = prevLevel + 1;
  nodes.forEach(node => {
    const { children, id, title, url } = node;
    const { lineageIds, lineageTitles } = prevLineage.reduce(
      (info, lineageItem) => {
        const { id: lineageId, title: lineageTitle } = lineageItem;
        info.lineageIds = info.lineageIds ? `${info.lineageIds}|${lineageId}` : lineageId;
        info.lineageTitles = info.lineageTitles ? `${info.lineageTitles}|${lineageTitle}` : lineageTitle;
        return info;
      },
      { lineageIds: '', lineageTitles: '' }
    );
    bookmarksById[id] = { id, level, lineage: prevLineage, lineageIds, lineageTitles, title, url };
    if (children) {
      flattenTree({
        nodes: children,
        prevLevel: level,
        prevLineage: [...prevLineage, { id, title: title || 'All Bookmarks' }],
        bookmarksById,
      });
    }
  });
  return bookmarksById;
};

export const formatFolderPath = path => (path || '').replace(/\./g, ' > ');

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  const flatTree = flattenTree({ nodes });
  console.log(flatTree);
  return buildFolderPaths({ nodes });
};
