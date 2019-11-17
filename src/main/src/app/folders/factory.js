import { getBookmarkTree } from '../browser';

export const buildFolderPaths = ({ nodes, folders, prevFolderPath = '' }) => {
  nodes.forEach(node => {
    const { children, id, title, url } = node;
    if (!url) {
      const folderPath = title ? `${prevFolderPath}/${title}` : prevFolderPath;
      if (folderPath) {
        folders.push({ id, path: folderPath });
      }
      if (children) {
        buildFolderPaths({ nodes: children, folders, prevFolderPath: folderPath });
      }
    }
  });
  return folders;
};

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  return buildFolderPaths({ nodes, folders: [] });
};
