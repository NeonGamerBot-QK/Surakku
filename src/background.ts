console.log("background script loaded");
// Handle incoming messages in the background script
function handleMessage(message, sender, sendResponse) {
  if (message.action === "fetchData") {
    fetch(message.url, message.options)
      .then((response) => response.text())
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        sendResponse({ success: false, error: error.toString() });
      });
    return true; // Keep the message channel open for asynchronous response
  }
  if (message.type === "exampleMessage") {
    console.log("Received message in background:", message);
    // Send a response back to the content script
    sendResponse({ response: "Hello from background" });
    return true;
  }
}

chrome.runtime.onMessageExternal.addListener(
  function (requst, sender, sendResponse) {
    console.log("got request", requst);
    console.log(sender);
  },
);
// Add listener for both Chrome and Firefox
if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.onMessage
) {
  chrome.runtime.onMessage.addListener(handleMessage);
} else if (
  typeof browser !== "undefined" &&
  browser.runtime &&
  browser.runtime.onMessage
) {
  browser.runtime.onMessage.addListener((message, sender) => {
    return new Promise((resolve) => {
      handleMessage(message, sender, resolve);
    });
  });
}
