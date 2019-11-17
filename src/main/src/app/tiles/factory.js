import sortBy from 'lodash/sortBy';
import { getBookmarks } from '../browser';
import { getDomain } from '../strings';

export const createTiles = async settings => {
  const { folderId = '5', imagesByUrl = {}, sorted = true } = settings || {};
  const bookmarks = await getBookmarks(folderId);
  const tiles = bookmarks.map(({ title, url }) => ({ title, domain: getDomain(url), url, image: imagesByUrl[url] }));
  return sorted ? sortBy(tiles, ({ title = '' }) => title.toLowerCase()) : tiles;
};
