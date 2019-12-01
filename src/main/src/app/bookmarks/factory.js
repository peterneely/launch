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

// const flattenTree = ({ nodes, bookmarksById = {}, parents = [], folderPathsByIds = {} }) => {
//   const concatItems = (items, item) => items ? `${items}|${item}` : item;
//   nodes.forEach(node => {
//     const { children, id, parentId, url } = node;
//     const title = node.title || 'All Bookmarks';
//     const { parentIds, parentTitles } = parents.reduce(
//       (info, parent) => {
//         const { parentIds, parentTitles } = info;
//         const { id: parentId, title: parentTitle } = parent;
//         info.parentIds = concatItems(parentIds, parentId);
//         info.parentTitles = concatItems(parentTitles, parentTitle);
//         return info;
//       },
//       { parentIds: '', parentTitles: '' }
//     );
//     bookmarksById[id] = { id, parentId, parentIds, title, url };
//     if (parentIds) {
//       folderPathsByIds[parentIds] = parentTitles;
//     }
//     if (children) {
//       flattenTree({
//         nodes: children,
//         bookmarksById,
//         parents: [...parents, { id, title }],
//         folderPathsByIds,
//       });
//     }
//   });
//   return { bookmarksById, folderPathsByIds };
// };

export const formatFolderPath = path => (path || '').replace(/\./g, ' > ');

export const getFolders = async () => {
  const nodes = await getBookmarkTree();
  // const { bookmarksById, folderPathsByIds } = flattenTree({ nodes });
  // console.log({ bookmarksById, folderPathsByIds });
  return buildFolderPaths({ nodes });
};
