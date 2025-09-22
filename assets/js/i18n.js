/**
 * Language Switch System - Minimal Nav Link Implementation
 * Clean, minimal implementation with navbar injection
 * 
 * @author Senior Frontend Architect
 * @version 9.0.0
 */

(() => {
  'use strict';

  // Configuration
  const KEY = 'lang';

  /**
   * Detect initial language from localStorage, cookie, or browser
   */
  const init = () => {
    // Check localStorage first
    const stored = localStorage.getItem(KEY);
    if (stored && (stored === 'fa' || stored === 'en')) {
      return stored;
    }

    // Check cookie
    const cookieMatch = document.cookie.match(/(?:^|;\s*)lang=(fa|en)\b/);
    if (cookieMatch) {
      return cookieMatch[1];
    }

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('fa')) {
      return 'fa';
    }

    // Default to English
    return 'en';
  };

  /**
   * Set language cookie
   */
  const setCookie = (lang) => {
    document.cookie = `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  /**
   * Apply language to the page
   */
  const apply = (lang) => {
    const isPersian = lang === 'fa';
    const html = document.documentElement;
    
    // Update HTML attributes
    html.lang = lang;
    html.dir = isPersian ? 'rtl' : 'ltr';
    
    // Enable/disable RTL CSS
    const rtlStyle = document.getElementById('rtl-style');
    if (rtlStyle) {
      if (isPersian) {
        rtlStyle.disabled = false;
        rtlStyle.setAttribute('rel', 'stylesheet');
      } else {
        rtlStyle.disabled = true;
        rtlStyle.removeAttribute('rel');
      }
    }
    
    // Update text content for all translatable elements
    document.querySelectorAll('[data-en][data-fa]').forEach(element => {
      const translation = isPersian ? 
        element.getAttribute('data-fa') : 
        element.getAttribute('data-en');
      
      if (translation !== null) {
        element.textContent = translation;
      }
    });
    
    // Update toggle button
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(isPersian));
      btn.setAttribute('aria-label', isPersian ? 
        'تغییر زبان به English' : 
        'Switch language to فارسی');
      
      // Update current and alternative language text
      const cur = btn.querySelector('.i18n-cur');
      const alt = btn.querySelector('.i18n-alt');
      if (cur && alt) {
        cur.textContent = isPersian ? 'FA' : 'EN';
        alt.textContent = isPersian ? 'EN' : 'FA';
      }
    }
    
    // Persist language preference
    localStorage.setItem(KEY, lang);
    setCookie(lang);
  };

  /**
   * Toggle language
   */
  const toggle = () => {
    const currentLang = document.documentElement.lang;
    const nextLang = currentLang === 'fa' ? 'en' : 'fa';
    apply(nextLang);
  };

  /**
   * Auto-inject language toggle into navbar/header
   */
  const injectLanguageToggle = () => {
    // Check if toggle already exists
    if (document.querySelector('#lang-toggle')) {
      return;
    }
    
    // Find navbar/header containers
    const headerSelectors = [
      'nav',
      '.navbar',
      '.navmenu',
      'header',
      '.header',
      '.topbar',
      '#header',
      '#navmenu'
    ];
    
    let headerContainer = null;
    for (const selector of headerSelectors) {
      headerContainer = document.querySelector(selector);
      if (headerContainer) {
        break;
      }
    }
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'lang-toggle';
    toggleButton.className = 'i18n-link';
    toggleButton.type = 'button';
    toggleButton.setAttribute('aria-pressed', 'false');
    toggleButton.setAttribute('aria-label', 'Switch language');
    
    // Create language segments
    const curSpan = document.createElement('span');
    curSpan.className = 'i18n-cur';
    curSpan.textContent = 'EN';
    
    const sepSpan = document.createElement('span');
    sepSpan.className = 'i18n-sep';
    sepSpan.textContent = ' | ';
    
    const altSpan = document.createElement('span');
    altSpan.className = 'i18n-alt';
    altSpan.textContent = 'FA';
    
    // Assemble button
    toggleButton.appendChild(curSpan);
    toggleButton.appendChild(sepSpan);
    toggleButton.appendChild(altSpan);
    
    // Inject into navbar/header or body
    if (headerContainer) {
      headerContainer.appendChild(toggleButton);
    } else {
      document.body.appendChild(toggleButton);
    }
  };

  /**
   * Initialize the language switch system
   */
  const initSystem = () => {
    // Apply initial language
    apply(init());
    
    // Inject language toggle
    injectLanguageToggle();
    
    // Add event listeners
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    
    // Click handler
    btn.addEventListener('click', toggle);
    
    // Keyboard handler
    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    });
    
    // Listen for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const headers = node.querySelectorAll ? 
              node.querySelectorAll('nav, .navbar, .navmenu, header, .header, .topbar, #header, #navmenu') : 
              (node.matches && node.matches('nav, .navbar, .navmenu, header, .header, .topbar, #header, #navmenu') ? [node] : []);
            
            headers.forEach(header => {
              if (!header.querySelector('#lang-toggle')) {
                injectLanguageToggle();
              }
            });
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSystem);
  } else {
    initSystem();
  }

  // Expose public API
  window.i18n = {
    getCurrentLanguage: () => document.documentElement.lang,
    setLanguage: apply,
    toggleLanguage: toggle,
    getAvailableLanguages: () => ['fa', 'en'],
    isRtlCssEnabled: () => {
      const rtlStyle = document.getElementById('rtl-style');
      return rtlStyle ? !rtlStyle.disabled : false;
    }
  };

})();