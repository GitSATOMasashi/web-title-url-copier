chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-title-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const text = `${tab.title}\n${tab.url}`;
      navigator.clipboard.writeText(text);
    });
  }
}); 