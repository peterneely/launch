import { getBookmarkTree } from '../browser';

export const buildFolderPaths = ({ nodes, foldersById, prevFolderPath = '' }) => {
  nodes.forEach(node => {
    const { children, id, title, url } = node;
    if (!url) {
      const folderPath = title ? `${prevFolderPath}/${title}` : prevFolderPath;
      if (folderPath) {
        foldersById[id] = folderPath;
      }
      if (children) {
        buildFolderPaths({ nodes: children, foldersById, prevFolderPath: folderPath });
      }
    }
  });
  return foldersById;
};

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  return buildFolderPaths({ nodes, foldersById: {} });
};
