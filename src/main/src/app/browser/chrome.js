import isEmpty from 'lodash/isEmpty';
import { SETTINGS_KEY } from './types';
import { getCachedSettings, setCachedSettings } from './localStorage';

const { runtime, storage } = window.chrome;

export const getBookmarkTree = () =>
  new Promise((resolve, reject) => {
    try {
      runtime.sendMessage({ type: 'GET_BOOKMARK_TREE' }, response => {
        const { bookmarkTree } = response || {};
        if (bookmarkTree) {
          resolve(bookmarkTree);
        } else {
          reject(new Error('Could not get Chrome bookmark tree'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });

export const getBookmarks = ({ folderId, excludeFolderIds = [], includeFolders = true }) =>
  !folderId
    ? Promise.resolve([])
    : new Promise((resolve, reject) => {
        try {
          runtime.sendMessage({ type: 'GET_BOOKMARKS', payload: { folderId } }, response => {
            const { rootFolder, bookmarks } = response || {};
            if (rootFolder) {
              const filteredBookmarks = includeFolders
                ? excludeFolderIds.length
                  ? bookmarks.filter(({ id }) => !excludeFolderIds.includes(id))
                  : bookmarks
                : bookmarks.filter(({ url }) => url);
              resolve({ rootFolder, bookmarks: filteredBookmarks });
            } else {
              reject(new Error('Could not get Chrome bookmarks'));
            }
          });
        } catch (error) {
          reject(error);
        }
      });

export const getSettings = () =>
  new Promise((resolve, reject) => {
    try {
      storage.sync.get(SETTINGS_KEY, async syncData => {
        const { [SETTINGS_KEY]: synchedSettings } = syncData || {};
        console.log({ synchedSettings });
        const settings = await (runtime.lastError || isEmpty(synchedSettings) ? getCachedSettings() : Promise.resolve(synchedSettings));
        resolve(settings);
      });
    } catch (error) {
      reject(error);
    }
  });

export const setSettings = settings =>
  new Promise((resolve, reject) => {
    try {
      storage.sync.set({ [SETTINGS_KEY]: settings }, async () => {
        if (runtime.lastError) {
          await setCachedSettings(settings);
        }
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
