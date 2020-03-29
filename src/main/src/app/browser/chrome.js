import uniqBy from 'lodash/uniqBy';
import { getCachedSettings, setCachedSettings } from './localStorage';

const { runtime } = window.chrome;

export const getBookmarks = () =>
  new Promise((resolve, reject) => {
    try {
      runtime.sendMessage({ type: 'GET_BOOKMARKS' }, response => {
        const { bookmarks } = response || {};
        if (bookmarks) {
          const uniqueBookmarks = uniqBy(bookmarks, ({ url }) => url);
          resolve(uniqueBookmarks);
        } else {
          reject(new Error('Could not get Chrome bookmarks'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });

export const getSettings = getCachedSettings;

export const setSettings = setCachedSettings;
