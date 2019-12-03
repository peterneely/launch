import { SETTINGS_KEY } from './types';
import { peterImagesByUrl } from '../settings/peter';

export const getCachedSettings = () => new Promise((resolve, reject) => {
  try {
    const settingsJson = localStorage.getItem(SETTINGS_KEY);
    const savedSettings = settingsJson ? JSON.parse(settingsJson) : { imagesByUrl: peterImagesByUrl };
    resolve(savedSettings);
  } catch (error) {
    reject(error);
  }
});

export const setCachedSettings = savedSettings => new Promise((resolve, reject) => {
  try {
    const settingsJson = JSON.stringify(savedSettings);
    localStorage.setItem(SETTINGS_KEY, settingsJson);
    resolve();
  } catch (error) {
    reject(error);
  }
});
