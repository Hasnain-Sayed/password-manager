# 🔐 PassVault
> Local Password Manager — store passwords locally, no cloud, no tracking

## Overview
Fully client-side password manager built with vanilla HTML, CSS, and JavaScript. All data lives in your browser's `localStorage` — nothing is ever sent to a server.

## Features
- Add website/app + password pairs to your vault
- Passwords hidden by default with dynamic bullet masking (• per character)
- Toggle visibility per entry with 👁 / 🙈
- Duplicate detection
- Delete entries with confirmation
- Live entry count
- Fully offline

## File Structure
```
passvault/
├── index.html    → App markup & layout
├── style.css     → Styling (dark theme, mono fonts)
└── script.js     → App logic (CRUD, localStorage)
```

## Usage
Open `index.html` in any modern browser. No install, no build step.

## ⚠️ Limitations
- Passwords stored in **plain text** in localStorage (not encrypted)
- No master password or auth
- No export/backup — clearing browser data deletes everything
- Device/browser specific — not synced

---
© 2026 PassVault — Built by Blaze
