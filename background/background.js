// 右クリックメニューの作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-title-url",
    title: "タイトルとURLをコピー",
    contexts: ["page", "link"]
  });
});

// クリップボードにコピーする関数
async function copyToClipboard(text) {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => tabs[0]);
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: text => {
      navigator.clipboard.writeText(text);
    },
    args: [text]
  });
}

// 右クリックメニューのクリックイベント処理
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "copy-title-url") {
    let title = tab.title;
    let url = tab.url;

    // リンクを右クリックした場合
    if (info.linkUrl) {
      url = info.linkUrl;
      // リンクのテキストは取得できないため、URLのみを使用
      title = info.linkUrl;
    }

    const text = `${title}\n${url}`;
    await copyToClipboard(text);
  }
});

// ショートカットキー機能
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-title-url") {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => tabs[0]);
    const text = `${tab.title}\n${tab.url}`;
    await copyToClipboard(text);
  }
}); 