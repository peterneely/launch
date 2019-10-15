import { linksByUrl } from './static';

export const getChromeLinks = () => new Promise((resolve, reject) => {
  window.chrome.runtime.sendMessage({ type: 'GET_BOOKMARKS' }, response => {
    const { bookmarks } = response || {};
    if (bookmarks) {
      const links = bookmarks.map(({ title, url }) => {
        const { icon } = linksByUrl[url] || {};
        return { title, url, icon };
      })
      resolve(links);
    } else {
      reject(new Error('Could not get Chrome bookmarks'));
    }
  });
});
