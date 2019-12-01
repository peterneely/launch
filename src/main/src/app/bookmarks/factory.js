import { getBookmarkTree, getBookmarks } from '../browser';

export const flattenFolders = ({ bookmarks, folders = [], foldersById = {} }) => {
  bookmarks.forEach(({ children, id, title, url }) => {
    if (!url) {
      const folder = { id, title: title || 'All Bookmarks' };
      if (children && children.some(({ url }) => !url)) {
        flattenFolders({ bookmarks: children, folders: [...folders, folder], foldersById });
      }
      foldersById[id] = [...folders, folder];
    }
  });
  return foldersById;
};

// const flattenTree = ({ bookmarks, bookmarksById = {}, parents = [], folderPathsByIds = {} }) => {
//   const concatItems = (items, item) => items ? `${items}|${item}` : item;
//   bookmarks.forEach(bookmark => {
//     const { children, id, parentId, url } = bookmark;
//     const title = bookmark.title || 'All Bookmarks';
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
//         bookmarks: children,
//         bookmarksById,
//         parents: [...parents, { id, title }],
//         folderPathsByIds,
//       });
//     }
//   });
//   return { bookmarksById, folderPathsByIds };
// };

export const formatFolderPath = (folders = []) => folders.map(({ title }) => title).join(' > ');

export const getFolders = async (folderId = null, settings = {}) => {
  const bookmarks = await (folderId ? getBookmarks(folderId, settings) : getBookmarkTree());
  return flattenFolders({ bookmarks });
};
