const { tabs } = chrome;

tabs.onCreated.addListener(tab => {
    tabs.update(tab.id, { url: 'https://peterneely.github.io/launch/' });
});