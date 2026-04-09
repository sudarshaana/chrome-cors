/**
 * Updates the declarativeNetRequest rules with both Request and Response modifications.
 * @param {boolean} enabled 
 * @param {string} whitelistText
 */
async function updateRules(enabled, whitelistText) {
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingIds = existingRules.map(r => r.id);
  
  if (!enabled) {
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingIds });
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  const patterns = (whitelistText || "")
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (patterns.length === 0) {
    patterns.push('*'); 
  }

  const rules = patterns.map((pattern, index) => ({
    id: index + 1,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      // MODIFYING REQUEST HEADERS (Stealth Mode)
      requestHeaders: [
        { header: 'origin', operation: 'remove' },
        { header: 'referer', operation: 'remove' }
      ],
      // MODIFYING RESPONSE HEADERS (Bypass Mode)
      responseHeaders: [
        { header: 'access-control-allow-origin', operation: 'set', value: '*' },
        { header: 'access-control-allow-methods', operation: 'set', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' },
        { header: 'access-control-allow-headers', operation: 'set', value: '*' },
        { header: 'access-control-expose-headers', operation: 'set', value: '*' },
        { header: 'access-control-allow-credentials', operation: 'set', value: 'true' }
      ]
    },
    condition: {
      urlFilter: pattern,
      resourceTypes: [
        'xmlhttprequest', 'sub_frame', 'stylesheet', 'script', 'image', 
        'font', 'object', 'ping', 'csp_report', 'media', 'websocket', 'other'
      ]
    }
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingIds,
    addRules: rules
  });
  
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
}

chrome.storage.onChanged.addListener(() => {
  chrome.storage.local.get(['enabled', 'whitelist'], (result) => {
    updateRules(!!result.enabled, result.whitelist);
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['enabled', 'whitelist'], (result) => {
    updateRules(!!result.enabled, result.whitelist);
  });
});

chrome.runtime.onInstalled.addListener(() => {
  const initialWhitelist = [
    "http://172.16.50.7/*",
    "http://172.16.50.8/*",
    "http://172.16.50.9/*",
    "http://172.16.50.12/*",
    "http://172.16.50.14/*"
  ].join('\n');
  chrome.storage.local.set({ enabled: true, whitelist: initialWhitelist }, () => {
    updateRules(true, initialWhitelist);
  });
});
