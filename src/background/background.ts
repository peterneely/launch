const handleGetBookmarkTree = sendResponse => {
  chrome.bookmarks.getTree(nodes => {
    if (nodes.length) {
      sendResponse({ bookmarkTree: nodes });
    }
  })
  return true; // marks this method as asynchronous so that it doesn't terminate before 'sendResponse' is called
};

const handleGetBookmarks = (payload, sendResponse) => {
  const { folderId } = payload;
  chrome.bookmarks.get(folderId, (parentNodes = []) => {
    chrome.bookmarks.getChildren(folderId, (childNodes = []) => {
      sendResponse({
        rootFolder: parentNodes[0] || null,
        bookmarks: childNodes,
      });
    });
  });
  return true; // marks this method as asynchronous so that it doesn't terminate before 'sendResponse' is called
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;
  switch (type) {
    case 'GET_BOOKMARK_TREE':
      return handleGetBookmarkTree(sendResponse)
    case 'GET_BOOKMARKS':
      return handleGetBookmarks(payload, sendResponse)
    default:
      return false;
  }
});
