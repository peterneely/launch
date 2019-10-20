import { SETTINGS_KEY } from './types';
import { peterImagesByUrl } from '../settings/peter';

export const getCachedSettings = () => new Promise((resolve, reject) => {
  try {
    const settingsJson = localStorage.getItem(SETTINGS_KEY);
    const settings = settingsJson ? JSON.parse(settingsJson) : { imagesByUrl: peterImagesByUrl };
    resolve(settings);
  } catch (error) {
    reject(error);
  }
});

export const setCachedSettings = settings => new Promise((resolve, reject) => {
  try {
    const settingsJson = JSON.stringify(settings);
    localStorage.setItem(SETTINGS_KEY, settingsJson);
    resolve();
  } catch (error) {
    reject(error);
  }
});
