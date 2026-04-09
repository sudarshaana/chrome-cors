# Privacy Policy for CORS Bypass Master

This Privacy Policy describes how **CORS Bypass Master** handles your data. Your privacy is a top priority, and the extension is designed to be as transparent and minimal as possible.

## 1. No Data Collection
**CORS Bypass Master does not collect, store, or transmit any personally identifiable information (PII) or browsing history to any external servers.** 

## 2. Local Storage
The extension uses `chrome.storage.local` to store the following data exclusively on your local machine:
- The user's "Active/Inactive" toggle state.
- The user's custom list of whitelisted URL patterns.

This data is never shared with the developer or any third parties.

## 3. Network Modification
The extension utilizes the `declarativeNetRequest` API to modify HTTP headers in real-time. This process happens entirely within your browser. 
- The extension only interacts with network requests that match the patterns you explicitly define in the whitelist. 
- No record of these requests is kept or sent elsewhere.

## 4. Third-Party Services
CORS Bypass Master does not use any third-party analytics, tracking scripts, or advertising services.

## 5. Changes to This Policy
As a lightweight developer tool, this policy is unlikely to change. However, any updates will be reflected in the project's repository.

---
**Contact:** If you have any questions about this privacy policy, you can reach out via the GitHub repository or the developer contact information provided in the Chrome Web Store.
