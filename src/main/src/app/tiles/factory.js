import sortBy from 'lodash/sortBy';
import { getDomain } from '../utils/strings';

export const createTiles = (bookmarks = [], settings) => {
  const { imagesByUrl = {}, sorted = true } = settings || {};
  const tiles = bookmarks.map(({ title, url }) => ({ title, domain: getDomain(url), url, image: imagesByUrl[url] }));
  return sorted ? sortBy(tiles, ({ title }) => (title || '').toLowerCase()) : tiles;
};
