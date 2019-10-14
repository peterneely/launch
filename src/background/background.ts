const isThisBackground = true;
console.log('isThisBackground', isThisBackground);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'GET_BOOKMARKS') {
      chrome.bookmarks.search({ title: 'Start' }, nodes => {
        if (nodes.length) {
          const { id } = nodes[0];
          chrome.bookmarks.getChildren(id, nodes => {
            // console.log(nodes);
            sendResponse({ bookmarks: nodes });
          })
        }
      })
      return true;
    }
  });
