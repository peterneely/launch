const handleGetBookmarkTree = sendResponse => {
  chrome.bookmarks.getTree(nodes => {
    if (nodes.length) {
      sendResponse({ bookmarkTree: nodes });
    }
  })
  return true; // marks this method as asynchronous so that it doesn't terminate before 'sendResponse' is called
};

const handleGetBookmarks = sendResponse => {
  chrome.bookmarks.search({ title: 'Start' }, nodes => {
    if (nodes.length) {
      const { id } = nodes[0];
      chrome.bookmarks.getChildren(id, nodes => {
        sendResponse({ bookmarks: nodes });
      })
    }
  })
  return true; // marks this method as asynchronous so that it doesn't terminate before 'sendResponse' is called
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_BOOKMARK_TREE':
      return handleGetBookmarkTree(sendResponse)
    case 'GET_BOOKMARKS':
      return handleGetBookmarks(sendResponse)
    default:
      return false;
  }
});
