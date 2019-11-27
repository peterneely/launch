import { getBookmarkTree } from '../browser';

export const buildFolderPaths = ({ nodes, foldersById, prevFolderPaths = [] }) => {
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

export const formatFolderPath = path => (path || '').replace(/\./g, ' > ');

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  return buildFolderPaths({ nodes, foldersById: {} });
};
