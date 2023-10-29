const tabs = Array.from(document.querySelectorAll("div.tab"));
for (const tab of tabs) {
    tab.addEventListener("click", () => onClickTab.call(tab));
}

function onClickTab() {
    const currentTab = this;
    const container = getContainer(currentTab);
    const tabs = getTabsOfContainer(container);
    for (const tab of tabs) {
        if (tab === currentTab) {
            if (!tab.classList.contains("tab_active")) {
                tab.classList.add("tab_active");
            }
        } else {
            tab.classList.remove("tab_active");
        }
    }

    const tabContents = getTabContentsOfContainer(container);
    const currentTabContent = tabContents[tabs.findIndex(tab => tab === currentTab)];
    for (const tabContent of tabContents) {
        if (tabContent === currentTabContent) {
            if (!tabContent.classList.contains("tab__content_active")) {
                tabContent.classList.add("tab__content_active");
            }
        } else {
            tabContent.classList.remove("tab__content_active");
        }
    }
}

function getContainer(childElement) {
    return childElement.closest("div.tabs");
}

function getTabsOfContainer(container) {
    return Array.from(document.querySelectorAll("div.tab"))
        .filter(tab => tab.closest("div.tabs") === container);
}

function getTabContentsOfContainer(container) {
    return Array.from(document.querySelectorAll("div.tab__content"))
        .filter(tab => tab.closest("div.tabs") === container);
}