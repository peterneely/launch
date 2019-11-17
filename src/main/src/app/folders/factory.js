import { getBookmarkTree } from '../browser';

export const createFolders = (tree, prevPath = '') => {
  const { children = [], title } = tree;
  if (children.length) {
    const path = title ? `${prevPath}/${title}` : prevPath;
    return createFolders(children, path)
  }
  return tree;
};

export const getFolders = async () => {
  const bookmarkTree = await getBookmarkTree();
  console.log(bookmarkTree);
  return createFolders(bookmarkTree);
};
