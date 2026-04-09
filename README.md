# CORS Bypass Master

A Chrome Extension for developers to bypass Same-Origin Policy (SOP) and CORS restrictions during development and testing.

This tool was specifically configured to facilitate media fetching for the Dhaka Flix ecosystem.

## Features

- **Stealth Mode**: Removes Origin and Referer headers from outgoing requests to prevent servers from rejecting connections based on the initiator.
- **Dynamic Response Injection**: Injects Access-Control-Allow-Origin: * and other essential CORS headers into incoming responses.
- **Custom Whitelisting**: Define specific IP addresses or domains that should be bypassed to maintain security for other websites.
- **Minimalist UI**: Dashboard for toggling the bypass and managing rules.

## Pre-configured Rules

The extension is pre-configured for the following Dhaka Flix media servers:
- http://172.16.50.7/*
- http://172.16.50.8/*
- http://172.16.50.9/*
- http://172.16.50.12/*
- http://172.16.50.14/*

## Installation

1. Download this repository.
2. Open Google Chrome and navigate to chrome://extensions.
3. Enable Developer mode in the top-right corner.
4. Click Load unpacked and select the extension directory.
5. Pin the extension to your toolbar for access.

## How to Use

1. Click the CORS Master icon in your toolbar.
2. Ensure the status is set to Active.
3. Manage IP addresses or domains in the Whitelisted URL Patterns area (one per line).
4. Refresh your development page to apply rules to new requests.

## Security Warning

Disabling CORS may weaken browser security. It is recommended to:
- You know what are you doing.
- Use specific whitelist patterns instead of wildcards where possible.
- Toggle the extension OFF when browsing sensitive sites such as banking or social media.

---
Developed by @sudarshaana
