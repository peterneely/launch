const isThisBackground = true;
console.log('isThisBackground', isThisBackground);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'GET_BOOKMARKS') {
      chrome.bookmarks.getTree(treeNode => {
        console.log(treeNode);
        sendResponse({ bookmarks: treeNode });
      });
      return true;
    }
  });
