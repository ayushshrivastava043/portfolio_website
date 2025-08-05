/**
 * Development cache-busting script
 * Automatically adds timestamp parameters to CSS and JS files to prevent caching
 * Only runs on localhost/127.0.0.1
 */

(function() {
    'use strict';
    
    // Only run on localhost/development
    if (!/localhost|127\.0\.0\.1/.test(location.host)) {
        console.log('🔒 Cache-busting disabled - not on localhost');
        return;
    }
    
    const stamp = Date.now();
    console.log(`🔄 Cache-busting enabled with timestamp: ${stamp}`);
    
    // Find all CSS and JS files
    const elements = document.querySelectorAll('link[rel="stylesheet"], script[src]');
    
    elements.forEach(function(el) {
        const attr = el.tagName === 'LINK' ? 'href' : 'src';
        const currentUrl = el.getAttribute(attr);
        
        if (currentUrl) {
            try {
                const url = new URL(currentUrl, location.origin);
                
                // Only add timestamp if it doesn't already have a version parameter
                if (!url.searchParams.has('v')) {
                    url.searchParams.set('v', stamp);
                    el.setAttribute(attr, url.toString());
                    console.log(`🔄 Cache-busted: ${currentUrl} → ${url.toString()}`);
                }
            } catch (e) {
                console.warn(`⚠️ Could not cache-bust: ${currentUrl}`, e);
            }
        }
    });
    
    console.log(`✅ Cache-busting complete for ${elements.length} resources`);
})(); 