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
    case 'GET_BOOKMARKS':
      return handleGetBookmarks(sendResponse)
    default:
      return false;
  }
});
