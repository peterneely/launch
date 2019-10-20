import isEmpty from 'lodash/isEmpty';
import { SETTINGS_KEY } from './types';
import { getCachedSettings, setCachedSettings } from './localStorage';

const { runtime, storage } = window.chrome;

export const getBookmarks = () =>
  new Promise((resolve, reject) => {
    try {
      runtime.sendMessage({ type: 'GET_BOOKMARKS' }, response => {
        const { bookmarks } = response || {};
        if (bookmarks) {
          resolve(bookmarks);
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
