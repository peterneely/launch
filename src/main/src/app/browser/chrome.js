import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import { SETTINGS_KEY } from './types';
import { getCachedSettings, setCachedSettings } from './localStorage';

const { runtime, storage } = window.chrome;

const hasUrl = ({ url }) => url;

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

export const getBookmarks = folderId =>
  !folderId
    ? Promise.resolve([])
    : new Promise((resolve, reject) => {
        try {
          runtime.sendMessage({ type: 'GET_BOOKMARKS', payload: { folderId } }, response => {
            const { bookmarks } = response || {};
            if (bookmarks) {
              const uniqueBookmarks = uniqBy(bookmarks.filter(hasUrl), hasUrl);
              resolve(uniqueBookmarks);
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
