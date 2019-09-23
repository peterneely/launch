const { tabs } = chrome;

tabs.onCreated.addListener(tab => {
    if (tab.url === 'chrome://newtab/') {
        tabs.update(tab.id, { url: 'https://peterneely.github.io/launch/' });
    }
});