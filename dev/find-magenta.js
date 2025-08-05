/**
 * Development magenta detection script
 * Scans for magenta colors and highlights problematic elements
 * Only runs on localhost/127.0.0.1
 */

(function() {
    'use strict';
    
    // Only run on localhost/development
    if (!/localhost|127\.0\.0\.1/.test(location.host)) {
        return;
    }
    
    const NEEDLES = ['#ff00ff', 'rgb(255, 0, 255)', 'magenta', '#f0f'];
    
    function isMagenta(val) {
        if (!val) return false;
        const v = val.toLowerCase().replace(/\s+/g, '');
        return v.includes('#ff00ff') || 
               v.includes('#f0f') || 
               v.includes('rgb(255,0,255)') || 
               v.includes('magenta');
    }
    
    console.log('🔍 Starting magenta detection scan...');
    
    // Scan stylesheets for magenta rules
    try {
        for (const ss of document.styleSheets) {
            let rules;
            try { 
                rules = ss.cssRules; 
            } catch (_) { 
                continue; // Skip cross-origin stylesheets
            }
            
            if (!rules) continue;
            
            for (const r of rules) {
                const css = r.cssText?.toLowerCase?.() || '';
                if (NEEDLES.some(n => css.includes(n))) {
                    console.warn('🚨 MAGENTA RULE FOUND in stylesheet:', ss.href || '(inline)', r);
                }
            }
        }
    } catch (e) {
        console.warn('⚠️ Error scanning stylesheets:', e);
    }
    
    // Highlight nodes that resolve to magenta
    const all = document.querySelectorAll('body, body *');
    let magentaElements = 0;
    
    for (const el of all) {
        const bg = getComputedStyle(el).backgroundColor;
        if (isMagenta(bg)) {
            el.style.outline = '2px dashed red';
            el.style.outlineOffset = '2px';
            console.warn('🚨 MAGENTA COMPUTED BACKGROUND on element:', el, 'bg=', bg);
            magentaElements++;
        }
    }
    
    // Create status badge
    const badge = document.createElement('div');
    badge.style.cssText = `
        position: fixed;
        right: 8px;
        bottom: 8px;
        padding: 8px 12px;
        font: 12px/1.2 monospace;
        background: #0008;
        color: #fff;
        z-index: 99999;
        border-radius: 6px;
        border: 1px solid #333;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        max-width: 300px;
        word-break: break-all;
    `;
    
    const pp = document.querySelector('.projects-portal, .projects-portal-section');
    const comp = pp ? getComputedStyle(pp).backgroundColor : 'n/a';
    const status = magentaElements > 0 ? '🚨' : '✅';
    
    badge.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">
            ${status} Magenta Detector
        </div>
        <div style="font-size: 11px;">
            .projects-portal bg: ${comp}<br>
            Magenta elements: ${magentaElements}
        </div>
    `;
    
    document.body.appendChild(badge);
    
    console.log(`✅ Magenta detection complete. Found ${magentaElements} elements with magenta background.`);
    
    if (magentaElements > 0) {
        console.warn('🚨 MAGENTA ELEMENTS DETECTED! Check the outlined elements above.');
    } else {
        console.log('✅ No magenta elements found.');
    }
})(); 