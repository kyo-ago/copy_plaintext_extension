chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message['type'] !== 'copy') {
        return;
    }
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();
    document.execCommand('paste');
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    sendResponse({
        'type': 'success'
    });
});