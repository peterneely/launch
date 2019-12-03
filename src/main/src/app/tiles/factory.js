import sortBy from 'lodash/sortBy';
import { getDomain } from '../utils/strings';

export const createTiles = (bookmarks = [], savedSettings) => {
  const { imagesByUrl = {}, sorted = true } = savedSettings || {};
  const tiles = bookmarks.map(({ title, url }) => ({ title, domain: getDomain(url), url, image: imagesByUrl[url] }));
  return sorted ? sortBy(tiles, ({ title }) => (title || '').toLowerCase()) : tiles;
};
