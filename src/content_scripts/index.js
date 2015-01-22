var bindCopy = (event) => {
    event.stopPropagation();
    chrome.runtime.sendMessage({
        'type': 'copy'
    }, (message) => {
    	window.removeEventListener('copy', bindCopy, true);
    	event.target.dispatchEvent(event);
    	window.addEventListener('copy', bindCopy, true);
    });
};
window.addEventListener('copy', bindCopy, true);
