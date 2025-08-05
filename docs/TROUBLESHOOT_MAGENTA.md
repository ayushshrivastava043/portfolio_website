# Magenta Debug Style Troubleshooting Guide

This guide helps you resolve issues with unwanted magenta (`#ff00ff`) backgrounds appearing on your website.

## Quick Start

### 1. Use the No-Cache Development Server

Instead of `python3 -m http.server 8000`, use:

```bash
python3 dev/server.py
```

This server automatically adds no-cache headers to prevent browser caching issues.

### 2. Check for Magenta Elements

The development tools automatically scan for magenta colors and will:
- Log warnings in the browser console
- Outline problematic elements with red dashed borders
- Show a status badge in the bottom-right corner

## Development Tools

### Cache Busting (`dev/cachebust-dev.js`)

Automatically adds timestamp parameters to CSS and JS files to prevent caching:
- Only runs on localhost/127.0.0.1
- Adds `?v=timestamp` to all stylesheet and script tags
- Logs cache-busting activity to console

### Magenta Detection (`dev/find-magenta.js`)

Scans for magenta colors and highlights problematic elements:
- Scans all stylesheets for magenta rules
- Checks computed backgrounds of all elements
- Outlines magenta elements with red dashed borders
- Shows status badge with detection results

### Emergency Override (`dev/anti-magenta.css`)

Temporarily neutralizes magenta backgrounds:
- Overrides all backgrounds to transparent
- Adds warning indicator
- Use only while investigating the source

## Browser Cache Issues

### Chrome DevTools

1. Open DevTools (F12)
2. Go to **Network** tab
3. Check **"Disable cache"** checkbox
4. Right-click refresh button → **"Empty Cache and Hard Reload"**

### Hard Refresh Commands

- **Mac**: `Cmd + Shift + R`
- **Windows/Linux**: `Ctrl + Shift + R`

### Incognito/Private Mode

Test in incognito/private browsing mode to rule out extension interference.

## Common Sources of Magenta

### 1. Browser Extensions

Some extensions inject CSS that can't be found in your codebase:
- Disable all extensions temporarily
- Test in incognito mode
- Check DevTools → Sources → Content scripts

### 2. DevTools Local Overrides

Chrome DevTools can override styles:
1. Open DevTools → Sources
2. Check for **Local Overrides** section
3. Clear any overrides

### 3. Service Workers

Check for service workers that might cache old styles:
1. DevTools → Application → Service Workers
2. Unregister any service workers
3. Clear storage

### 4. Browser Cache

Force clear all browser data:
1. Chrome Settings → Privacy and security → Clear browsing data
2. Select "All time" and check all boxes
3. Click "Clear data"

## Debugging Steps

### Step 1: Identify the Source

1. Run `python3 dev/server.py`
2. Open browser console
3. Look for warnings from `find-magenta.js`
4. Check outlined elements

### Step 2: Check File Sources

1. View page source (Ctrl+U)
2. Look for the build timestamp: `<!-- build: 2025-08-04T00:30:00Z -->`
3. Verify it matches your latest edit

### Step 3: Use Emergency Override

If magenta persists:
1. Enable `dev/anti-magenta.css` in `index.html`
2. This will neutralize all backgrounds temporarily
3. Use this time to investigate the source

### Step 4: Check for Injected Styles

1. DevTools → Elements
2. Look for `<style>` tags in `<head>`
3. Check for inline styles on elements
4. Look for external stylesheets

## Production Deployment

Before deploying to production:

1. Remove all DEV blocks from `index.html`:
   ```html
   <!-- DEV ONLY: remove for production -->
   <script src="dev/cachebust-dev.js"></script>
   <script src="dev/find-magenta.js"></script>
   <link rel="stylesheet" href="dev/anti-magenta.css">
   ```

2. Remove the build timestamp comment

3. Test the site without development tools

## File Structure

```
dev/
├── server.py              # No-cache development server
├── cachebust-dev.js       # Cache-busting script
├── find-magenta.js        # Magenta detection
└── anti-magenta.css       # Emergency override

docs/
├── TROUBLESHOOT_MAGENTA.md # This file
└── magenta-audit.txt      # Audit report
```

## Support

If you're still experiencing issues:

1. Check the audit report: `docs/magenta-audit.txt`
2. Look for console warnings from the detection tools
3. Verify you're using the no-cache server
4. Test in incognito mode with extensions disabled 