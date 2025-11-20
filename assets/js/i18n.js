/**
 * Language Switch System - Resilient Version
 * Cleans corrupted data-fa attributes and falls back gracefully.
 */

(() => {
  'use strict';

  const KEY = 'lang';

  const init = () => {
    const stored = localStorage.getItem(KEY);
    if (stored === 'fa' || stored === 'en') return stored;

    const cookieMatch = document.cookie.match(/(?:^|;\s*)lang=(fa|en)\b/);
    if (cookieMatch) return cookieMatch[1];

    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('fa')) return 'fa';

    return 'en';
  };

  const setCookie = (lang) => {
    document.cookie = `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  const isCorrupted = (val) =>
    val == null || val.indexOf('\uFFFD') !== -1 || /[\u0000-\u001f]/.test(val);

  const apply = (lang) => {
    const isPersian = lang === 'fa';
    const html = document.documentElement;

    html.lang = lang;
    html.dir = isPersian ? 'rtl' : 'ltr';

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

    document.querySelectorAll('[data-en][data-fa]').forEach((el) => {
      const en = el.getAttribute('data-en');
      let fa = el.getAttribute('data-fa');

      if (isCorrupted(fa)) {
        fa = en || fa || '';
        el.setAttribute('data-fa', fa);
      }

      const translation = isPersian ? fa : en;
      if (translation != null) {
        el.textContent = translation;
      }
    });

    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(isPersian));
      btn.setAttribute(
        'aria-label',
        isPersian ? 'تغییر زبان به انگلیسی' : 'Switch language to فارسی'
      );

      const cur = btn.querySelector('.i18n-cur');
      const alt = btn.querySelector('.i18n-alt');
      if (cur && alt) {
        cur.textContent = isPersian ? 'FA' : 'EN';
        alt.textContent = isPersian ? 'EN' : 'FA';
      }
    }

    const preloaderContainer = document.getElementById('preloader-container');
    const loadingText = document.getElementById('loading-text');
    if (preloaderContainer && loadingText) {
      preloaderContainer.className = `preloader-container ${
        isPersian ? 'rtl' : 'ltr'
      }`;
      loadingText.textContent = isPersian
        ? 'در حال بارگذاری...'
        : 'Loading...';
    }

    localStorage.setItem(KEY, lang);
    setCookie(lang);
  };

  const toggle = () => {
    const currentLang = document.documentElement.lang;
    const nextLang = currentLang === 'fa' ? 'en' : 'fa';
    localStorage.setItem(KEY, nextLang);
    setCookie(nextLang);
    setTimeout(() => window.location.reload(), 150);
  };

  const injectLanguageToggle = () => {
    if (document.querySelector('#lang-toggle')) return;

    const headerSelectors = [
      'nav',
      '.navbar',
      '.navmenu',
      'header',
      '.header',
      '.topbar',
      '#header',
      '#navmenu',
    ];

    let headerContainer = null;
    for (const selector of headerSelectors) {
      headerContainer = document.querySelector(selector);
      if (headerContainer) break;
    }

    const toggleButton = document.createElement('button');
    toggleButton.id = 'lang-toggle';
    toggleButton.className = 'i18n-link';
    toggleButton.type = 'button';
    toggleButton.setAttribute('aria-pressed', 'false');
    toggleButton.setAttribute('aria-label', 'Switch language');

    const curSpan = document.createElement('span');
    curSpan.className = 'i18n-cur';
    curSpan.textContent = 'EN';

    const sepSpan = document.createElement('span');
    sepSpan.className = 'i18n-sep';
    sepSpan.textContent = ' | ';

    const altSpan = document.createElement('span');
    altSpan.className = 'i18n-alt';
    altSpan.textContent = 'FA';

    toggleButton.appendChild(curSpan);
    toggleButton.appendChild(sepSpan);
    toggleButton.appendChild(altSpan);

    if (headerContainer) {
      headerContainer.appendChild(toggleButton);
    } else {
      document.body.appendChild(toggleButton);
    }
  };

  const initSystem = () => {
    apply(init());
    injectLanguageToggle();

    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.style.transform = 'scale(0.95)';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.opacity = '';
      }, 100);
      toggle();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        btn.style.transform = 'scale(0.95)';
        btn.style.opacity = '0.7';
        setTimeout(() => {
          btn.style.transform = '';
          btn.style.opacity = '';
        }, 100);
        toggle();
      }
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const headers = node.querySelectorAll
              ? node.querySelectorAll(
                  'nav, .navbar, .navmenu, header, .header, .topbar, #header, #navmenu'
                )
              : node.matches &&
                node.matches(
                  'nav, .navbar, .navmenu, header, .header, .topbar, #header, #navmenu'
                )
              ? [node]
              : [];

            headers.forEach((header) => {
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
      subtree: true,
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSystem);
  } else {
    initSystem();
  }

  window.i18n = {
    getCurrentLanguage: () => document.documentElement.lang,
    setLanguage: (lang) => {
      localStorage.setItem(KEY, lang);
      setCookie(lang);
      setTimeout(() => {
        window.location.reload();
      }, 150);
    },
    toggleLanguage: toggle,
    getAvailableLanguages: () => ['fa', 'en'],
    isRtlCssEnabled: () => {
      const rtlStyle = document.getElementById('rtl-style');
      return rtlStyle ? !rtlStyle.disabled : false;
    },
  };
})();
