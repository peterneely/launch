// eslint-disable-next-line no-undef
const { bookmarks, tabs } = chrome;

tabs.onCreated.addListener(tab => {
    if (tab.url === 'chrome://newtab/') {
        // bookmarks.getTree(results => {
        //     console.log(results);
        // });
        bookmarks.getSubTree('6', results => {
            console.log(results);
        });
        tabs.update(tab.id, { url: 'https://peterneely.github.io/launch/' });
    }
});