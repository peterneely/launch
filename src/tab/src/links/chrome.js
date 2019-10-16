import sortBy from 'lodash/sortBy';
import { getDomain, linksByDomain } from './static';

export const getChromeLinks = sorted => new Promise((resolve, reject) => {
  window.chrome.runtime.sendMessage({ type: 'GET_BOOKMARKS' }, response => {
    const { bookmarks } = response || {};
    if (bookmarks) {
      const links = bookmarks.map(({ title, url }) => {
        const domain = getDomain(url);
        const { image } = linksByDomain[domain] || {};
        return { title, domain, url, image };
      });
      resolve(sorted ? sortBy(links, ({ title = '' }) => title.toLowerCase()) : links);
    } else {
      reject(new Error('Could not get Chrome bookmarks'));
    }
  });
});
