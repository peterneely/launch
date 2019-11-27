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
    bookmarksById[id] = { id, level, lineage: prevLineage, title, url };
    if (children) {
      flattenTree({
        nodes: children,
        prevLevel: level,
        prevLineage: [...prevLineage, { id, title }],
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
