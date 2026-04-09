document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-cors');
  const statusText = document.getElementById('status-text');
  const whitelistArea = document.getElementById('whitelist');

  const DEFAULT_WHITELIST = [
    "http://172.16.50.7/*",
    "http://172.16.50.8/*",
    "http://172.16.50.9/*",
    "http://172.16.50.12/*",
    "http://172.16.50.14/*"
  ].join('\n');

  // Load current state
  chrome.storage.local.get(['enabled', 'whitelist'], (result) => {
    const isEnabled = !!result.enabled;
    const whitelist = result.whitelist !== undefined ? result.whitelist : DEFAULT_WHITELIST;

    toggle.checked = isEnabled;
    whitelistArea.value = whitelist;
    updateStatusUI(isEnabled);
  });

  // Handle toggle change
  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    const whitelist = whitelistArea.value;
    chrome.storage.local.set({ enabled: isEnabled, whitelist }, () => {
      updateStatusUI(isEnabled);
    });
  });

  // Handle whitelist change
  whitelistArea.addEventListener('input', () => {
    const isEnabled = toggle.checked;
    const whitelist = whitelistArea.value;
    // Save whitelist immediately on change
    chrome.storage.local.set({ whitelist }, () => {
      // If extension is ON, we need to signal background to update rules
      // storage.onChanged takes care of this
    });
  });

  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusText.textContent = 'Active';
      statusText.className = 'status-on';
    } else {
      statusText.textContent = 'Inactive';
      statusText.className = 'status-off';
    }
  }
});
