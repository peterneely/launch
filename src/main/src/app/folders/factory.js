import { getBookmarkTree } from '../browser';

export const buildFolderPaths = ({ nodes, folderPaths, prevFolderPath = '' }) => {
  nodes.forEach(node => {
    const { children, title, url } = node;
    if (!url) {
      const folderPath = title ? `${prevFolderPath}/${title}` : prevFolderPath;
      if (folderPath) {
        folderPaths.push(folderPath);
      }
      if (children) {
        buildFolderPaths({ nodes: children, folderPaths, prevFolderPath: folderPath });
      }
    }
  });
  return folderPaths;
};

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  return buildFolderPaths({ nodes, folderPaths: [] });
};
