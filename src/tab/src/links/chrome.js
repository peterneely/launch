import sortBy from 'lodash/sortBy';
import { getDomain, linkConfigsByDomain } from './static';

export const getChromeLinkConfigs = sorted => new Promise((resolve, reject) => {
  window.chrome.runtime.sendMessage({ type: 'GET_BOOKMARKS' }, response => {
    const { bookmarks } = response || {};
    if (bookmarks) {
      const linkConfigs = bookmarks.map(({ title, url }) => {
        const domain = getDomain(url);
        const { image } = linkConfigsByDomain[domain] || {};
        return { title, domain, url, image };
      });
      resolve(sorted ? sortBy(linkConfigs, ({ title = '' }) => title.toLowerCase()) : linkConfigs);
    } else {
      reject(new Error('Could not get Chrome bookmarks'));
    }
  });
});
