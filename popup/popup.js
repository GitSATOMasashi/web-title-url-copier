document.getElementById('copyButton').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const text = `${tab.title}\n${tab.url}`;
  await navigator.clipboard.writeText(text);
  
  const message = document.getElementById('message');
  message.textContent = 'コピーしました！';
  setTimeout(() => {
    message.textContent = '';
  }, 2000);
}); 