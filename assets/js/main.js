/**
 * ===============================================
 * MEET AJ PORTFOLIO - MAIN JAVASCRIPT
 * ===============================================
 * 
 * Main JavaScript functionality for the portfolio website
 * Handles navigation, mobile menu, and UI interactions
 * 
 * Features:
 * - Mobile navigation toggle
 * - Smooth scrolling
 * - Menu overlay management
 * - Accessibility improvements
 * 
 * ===============================================
 */
(function () {
  "use strict";

  const headerToggleBtn = document.querySelector("#menu-toggle");
  const header = document.querySelector("#header");

  // Simple debounce helper to prevent ReferenceError and calm resize spam
  function debounce(fn, delay = 200) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Create overlay for mobile
  let overlay = document.getElementById("menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "menu-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    if (header) {
      header.classList.add("header-show");
      overlay.classList.add("active");
      if (headerToggleBtn) {
        headerToggleBtn.setAttribute("aria-expanded", "true");
        const icon = headerToggleBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("bi-list");
          icon.classList.add("bi-x");
        }
      }
      // Improve mobile performance - prevent scroll without changing position
      document.body.style.overflow = "hidden";
      // Remove position: fixed and top to prevent page position change
    }
  }

  function closeMenu() {
    if (header) {
      header.classList.remove("header-show");
      overlay.classList.remove("active");
      if (headerToggleBtn) {
        headerToggleBtn.setAttribute("aria-expanded", "false");
        const icon = headerToggleBtn.querySelector("i");
        if (icon) {
          icon.classList.add("bi-list");
          icon.classList.remove("bi-x");
        }
      }
      // Restore scroll position - without changing page position
      document.body.style.overflow = "";
      // Remove position: fixed and top to prevent page position change
    }
  }

  function headerToggle() {
    if (header && header.classList.contains("header-show")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Event listeners
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close menu after clicking menu links on mobile
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", (e) => {
      if (
        window.innerWidth < 1200 &&
        header &&
        header.classList.contains("header-show")
      ) {
        closeMenu();
        // If link is Home and we're elsewhere, prevent going to Hero
        if (navmenu.getAttribute("href") === "#hero" && window.scrollY > 200) {
          e.preventDefault();
          // Just close menu, don't change page position
        }
      }
    });
  });

  // Close menu when page size changes
  // This event listener is added at the end of the file

  // Improve mobile performance - prevent body scroll when menu is open
  function preventBodyScroll() {
    if (header && header.classList.contains("header-show")) {
      document.body.style.overflow = "hidden";
      // Remove position: fixed and top to prevent page position change
    } else {
      document.body.style.overflow = "";
      // Remove position: fixed and top to prevent page position change
    }
  }

  // Add event listener for menu state change
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        preventBodyScroll();
      }
    });
  });

  if (header) {
    observer.observe(header, { attributes: true });
  }

  // Improve touch events performance on mobile
  if ("ontouchstart" in window) {
    // Add touch support for menu
    if (headerToggleBtn) {
      headerToggleBtn.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          headerToggle();
        },
        { passive: false }
      );
    }

    // Improve menu links performance on mobile
    document.querySelectorAll("#navmenu a").forEach((link) => {
      link.addEventListener("touchstart", function (e) {
        // Add small delay for better UX
        setTimeout(() => {
          if (
            window.innerWidth < 1200 &&
            header &&
            header.classList.contains("header-show")
          ) {
            closeMenu();
          }
        }, 100);
      });
    });

    // Improve overlay performance on mobile
    if (overlay) {
      overlay.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          closeMenu();
        },
        { passive: false }
      );
    }
  }

  // Improve keyboard navigation performance
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      header &&
      header.classList.contains("header-show")
    ) {
      closeMenu();
    }
  });

  // scroll top is managed at the end of the file

  function aosInit() {
    if (window.AOS) {
      // Improve mobile settings for AOS
      let config = {
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      };

      if (window.innerWidth <= 768) {
        config.duration = 400; // Reduce duration for mobile
        config.offset = 50; // Reduce offset for mobile
      }

      AOS.init(config);
    }
  }
  window.addEventListener("load", aosInit);


  if (window.PureCounter) {
    // Improve mobile settings for PureCounter
    let config = {
      duration: 2000,
      delay: 10,
    };

    if (window.innerWidth <= 768) {
      config.duration = 1500; // Reduce duration for mobile
      config.delay = 5;
    }

    new PureCounter(config);
  }

  let skillsAnimation = document.querySelectorAll(".skills-animation");
  if (skillsAnimation.length > 0 && window.Waypoint) {
    skillsAnimation.forEach((item) => {
      // Improve mobile settings for Waypoint
      let offset = "80%";
      if (window.innerWidth <= 768) {
        offset = "60%"; // Reduce offset for mobile
      }

      new Waypoint({
        element: item,
        offset: offset,
        handler: function () {
          let progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            const value = el.getAttribute("aria-valuenow");
            if (value) {
              // Improve animation for mobile
              let duration = "0.9s";
              if (window.innerWidth <= 768) {
                duration = "0.6s";
              }
              el.style.transition = `width ${duration} ease`;
              el.style.width = value + "%";
            }
          });
        },
      });
    });
  }

  if (window.GLightbox) {
    // Improve mobile settings for GLightbox
    let config = {
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
    };

    if (window.innerWidth <= 768) {
      config.touchNavigation = true;
      config.keyboardNavigation = false; // Disable keyboard navigation on mobile
    }

    const glightbox = GLightbox(config);
  }

  function initPortfolio() {
    document
      .querySelectorAll(".isotope-layout")
      .forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
        let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
        let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

        let initIsotope;
        const container = isotopeItem.querySelector(".isotope-container");

        if (container && window.imagesLoaded && window.Isotope) {
          // Ensure images are ready
          imagesLoaded(container, function () {
            // Improve mobile settings for Isotope
            let transitionDuration = "0.6s";
            if (window.innerWidth <= 768) {
              transitionDuration = "0.4s"; // Reduce duration for mobile
            }

            initIsotope = new Isotope(container, {
              itemSelector: ".isotope-item",
              layoutMode: layout,
              filter: filter,
              sortBy: sort,
              transitionDuration: transitionDuration,
              isOriginLeft: document.documentElement.dir !== "rtl",
            });
            container._isotopeInstance = initIsotope;
            container.classList.add("isotope-ready");

            // Force a relayout after fonts/images settle to avoid broken first render
            setTimeout(() => initIsotope.arrange(), 150);
            if (document.fonts && document.fonts.ready) {
              document.fonts.ready.then(() => {
                if (container._isotopeInstance) container._isotopeInstance.arrange();
              });
            }

            // After initializing Isotope, refresh AOS
            if (typeof aosInit === "function") {
              setTimeout(aosInit, 100);
            }
          });

          // Event listeners for filters
          isotopeItem
            .querySelectorAll(".isotope-filters li")
            .forEach(function (filters) {
              filters.addEventListener(
                "click",
                function () {
                  const activeFilter = isotopeItem.querySelector(
                    ".isotope-filters .filter-active"
                  );
                  if (activeFilter) {
                    activeFilter.classList.remove("filter-active");
                  }
                  this.classList.add("filter-active");
                  if (initIsotope) {
                    initIsotope.arrange({
                      filter: this.getAttribute("data-filter"),
                    });
                    // After filtering, refresh AOS too
                    setTimeout(function () {
                      if (typeof aosInit === "function") aosInit();
                    }, 200);
                  }
                },
                false
              );

              // Improve touch events performance for filters on mobile
              if ("ontouchstart" in window) {
                filters.addEventListener(
                  "touchstart",
                  function (e) {
                    e.preventDefault();
                    this.click();
                  },
                  { passive: false }
                );
              }
            });
        } else {
          // If Isotope or imagesLoaded not loaded, try again
          setTimeout(initPortfolio, 100);
        }
      });
  }

  // Run Portfolio after complete DOM load
  window.addEventListener("load", initPortfolio);

  // Improve mobile performance for portfolio
  function initPortfolioMobile() {
    if (window.innerWidth <= 768) {
      // Specific mobile settings for portfolio
      document.querySelectorAll(".portfolio-content").forEach((item) => {
        item.style.minHeight = "200px";
      });

      // Improve touch events performance for portfolio
      document.querySelectorAll(".portfolio-content").forEach((item) => {
        item.addEventListener("touchstart", function (e) {
          this.style.transform = "scale(0.98)";
        });

        item.addEventListener("touchend", function (e) {
          this.style.transform = "scale(1)";
        });
      });
    }
  }

  // Execute mobile settings for portfolio
  window.addEventListener("load", initPortfolioMobile);
  window.addEventListener("resize", initPortfolioMobile);

  // Safeguard: relayout isotope on resize/orientation to keep articles grid aligned
  window.addEventListener(
    "resize",
    debounce(() => {
      document.querySelectorAll(".isotope-container").forEach((container) => {
        if (container._isotopeInstance) container._isotopeInstance.arrange();
      });
    }, 150)
  );

  // Improve mobile performance for portfolio filters
  function initPortfolioFiltersMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-filters li").forEach((filter) => {
        filter.style.padding = "8px 12px";
        filter.style.fontSize = "13px";
        filter.style.margin = "0 4px 8px 4px";
      });
    }
  }

  window.addEventListener("load", initPortfolioFiltersMobile);
  window.addEventListener("resize", initPortfolioFiltersMobile);

  // Improve mobile performance for portfolio items
  function initPortfolioItemsMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.style.marginBottom = "20px";
      });
    }
  }

  window.addEventListener("load", initPortfolioItemsMobile);
  window.addEventListener("resize", initPortfolioItemsMobile);

  // Improve mobile performance for portfolio content
  function initPortfolioContentMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-content").forEach((content) => {
        content.style.minHeight = "200px";
        content.style.borderRadius = "8px";
        content.style.overflow = "hidden";
      });
    }
  }

  window.addEventListener("load", initPortfolioContentMobile);
  window.addEventListener("resize", initPortfolioContentMobile);

  // Improve mobile performance for portfolio info
  function initPortfolioInfoMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info").forEach((info) => {
        info.style.padding = "10px";
        info.style.fontSize = "12px";
      });
    }
  }

  window.addEventListener("load", initPortfolioInfoMobile);
  window.addEventListener("resize", initPortfolioInfoMobile);

  // Improve mobile performance for portfolio links
  function initPortfolioLinksMobile() {
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll(
          ".portfolio-info .preview-link, .portfolio-info .details-link"
        )
        .forEach((link) => {
          link.style.fontSize = "20px";
          link.style.width = "40px";
          link.style.height = "40px";
          link.style.borderRadius = "50%";
          link.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          link.style.display = "flex";
          link.style.alignItems = "center";
          link.style.justifyContent = "center";
        });
    }
  }

  window.addEventListener("load", initPortfolioLinksMobile);
  window.addEventListener("resize", initPortfolioLinksMobile);

  // Improve mobile performance for portfolio images
  function initPortfolioImagesMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-content img").forEach((img) => {
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
      });
    }
  }

  window.addEventListener("load", initPortfolioImagesMobile);
  window.addEventListener("resize", initPortfolioImagesMobile);

  // Improve mobile performance for portfolio titles
  function initPortfolioTitlesMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info h4").forEach((title) => {
        title.style.fontSize = "12px";
        title.style.padding = "4px 8px";
        title.style.marginBottom = "5px";
      });
    }
  }

  window.addEventListener("load", initPortfolioTitlesMobile);
  window.addEventListener("resize", initPortfolioTitlesMobile);

  // Improve mobile performance for portfolio descriptions
  function initPortfolioDescriptionsMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info p").forEach((desc) => {
        desc.style.fontSize = "11px";
        desc.style.lineHeight = "1.4";
        desc.style.marginBottom = "8px";
      });
    }
  }

  window.addEventListener("load", initPortfolioDescriptionsMobile);
  window.addEventListener("resize", initPortfolioDescriptionsMobile);

  // Improve mobile performance for portfolio container
  function initPortfolioContainerMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".isotope-container").forEach((container) => {
        container.style.padding = "0 10px";
      });
    }
  }

  window.addEventListener("load", initPortfolioContainerMobile);
  window.addEventListener("resize", initPortfolioContainerMobile);

  // Improve mobile performance for portfolio layout
  function initPortfolioLayoutMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".isotope-layout").forEach((layout) => {
        layout.style.padding = "0 10px";
      });
    }
  }

  window.addEventListener("load", initPortfolioLayoutMobile);
  window.addEventListener("resize", initPortfolioLayoutMobile);

  // Improve mobile performance for portfolio section
  function initPortfolioSectionMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio.section").forEach((section) => {
        section.style.padding = "40px 0";
      });
    }
  }

  window.addEventListener("load", initPortfolioSectionMobile);
  window.addEventListener("resize", initPortfolioSectionMobile);

  // Improve mobile performance for portfolio title
  function initPortfolioTitleMobile() {
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll(".portfolio .section-title h2")
        .forEach((title) => {
          title.style.fontSize = "24px";
          title.style.marginBottom = "15px";
        });
    }
  }

  window.addEventListener("load", initPortfolioTitleMobile);
  window.addEventListener("resize", initPortfolioTitleMobile);

  function initSwiper() {
    if (window.Swiper) {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          const configElement = swiperElement.querySelector(".swiper-config");
          if (configElement) {
            try {
              let config = JSON.parse(configElement.innerHTML.trim());

              const isRtl = document.documentElement.dir === "rtl";
              const isTestimonialsSlider = swiperElement.closest(".testimonials");

              // Keep Swiper aware of document direction for testimonials
              if (isTestimonialsSlider) {
                swiperElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
                swiperElement.classList.toggle("swiper-rtl", isRtl);
              }

              const hasBreakpoints =
                config.breakpoints &&
                Object.keys(config.breakpoints).length > 0;

              if (!hasBreakpoints) {
                if (window.innerWidth <= 768) {
                  config.slidesPerView = 1;
                  config.spaceBetween = 20;
                } else if (window.innerWidth <= 991) {
                  config.slidesPerView = 2;
                  config.spaceBetween = 30;
                } else {
                  config.slidesPerView = 3;
                  config.spaceBetween = 30;
                }
              }

              if (
                isTestimonialsSlider &&
                isRtl &&
                config.navigation &&
                config.navigation.nextEl &&
                config.navigation.prevEl
              ) {
                const originalNext = config.navigation.nextEl;
                config.navigation.nextEl = config.navigation.prevEl;
                config.navigation.prevEl = originalNext;
              }

              if (window.innerWidth <= 768) {
                if (config.autoplay) {
                  config.autoplay = Object.assign({}, config.autoplay, {
                    delay: config.autoplay.delay || 4000,
                    disableOnInteraction: false,
                  });
                } else {
                  config.autoplay = {
                    delay: 4000,
                    disableOnInteraction: false,
                  };
                }
              }

              if (swiperElement.classList.contains("swiper-tab")) {
                if (typeof initSwiperWithCustomPagination === "function") {
                  initSwiperWithCustomPagination(swiperElement, config);
                }
              } else {
                const swiper = new Swiper(swiperElement, config);
                
                // Keep autoplay running continuously for testimonials
                // No pause/resume functionality - autoplay continues during hover
              }
            } catch (e) {
              console.warn("Invalid Swiper config:", e);
            }
          }
        });
    }
  }
  window.addEventListener("load", initSwiper);

  window.addEventListener("load", function () {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        let offset = parseInt(scrollMarginTop) || 0;

        // Improve mobile performance for scroll
        if (window.innerWidth <= 768) {
          offset += 20; // Add more margin for mobile
        }

        window.scrollTo({
          top: section.offsetTop - offset,
          behavior: "smooth",
        });
      }, 100);
    }
  });

  let navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      // Improve mobile performance for scrollspy
      let offset = 200;
      if (window.innerWidth <= 768) {
        offset = 100; // Reduce offset for mobile
      }

      let position = window.scrollY + offset;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  // Improve mobile performance for scroll events
  let scrollTimeout;
  function throttledScroll() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        navmenuScrollspy();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  }

  // Use throttled scroll for better performance
  document.addEventListener("scroll", throttledScroll);

  // Remove old scroll event listener
  document.removeEventListener("scroll", navmenuScrollspy);

  // Improve mobile performance for resize events
  let resizeTimeout;
  function throttledResize() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        // Re-execute mobile settings
        initPortfolioMobile();
        initSwiper();
        resizeTimeout = null;
      }, 250);
    }
  }

  window.addEventListener("resize", throttledResize);

  // Add new resize event listener
  window.addEventListener("resize", function () {
    if (
      window.innerWidth >= 1200 &&
      header &&
      header.classList.contains("header-show")
    ) {
      closeMenu();
    }
  });

  // Load-more for articles (portfolio) section
  function initArticlesLoadMore() {
    const container = document.querySelector(
      "#portfolio .isotope-container"
    );
    const loadMoreBtn = document.getElementById("articles-load-more");
    if (!container || !loadMoreBtn) return;

    const items = Array.from(container.querySelectorAll(".portfolio-item"));
    const batchSize = 6;
    let visibleCount = batchSize;
    let ready = false;

    const getFilteredItems = () => {
      const iso = container._isotopeInstance;
      if (iso && Array.isArray(iso.filteredItems)) {
        return iso.filteredItems.map((entry) => entry.element);
      }
      return items;
    };

    const updateVisibility = () => {
      const filtered = getFilteredItems();

      // Reset hidden state on all items first
      items.forEach((item) => item.classList.remove("is-hidden"));

      filtered.forEach((item, index) => {
        const show = index < visibleCount;
        item.classList.toggle("is-hidden", !show);
      });

      if (container._isotopeInstance) {
        container._isotopeInstance.arrange();
      }

      loadMoreBtn.style.display =
        visibleCount >= filtered.length ? "none" : "inline-flex";
    };

    const kickOff = () => {
      if (ready) return;
      if (container._isotopeInstance) {
        ready = true;
        updateVisibility();
      } else {
        // Wait for isotope to initialize
        setTimeout(kickOff, 50);
      }
    };

    kickOff();

    loadMoreBtn.addEventListener("click", () => {
      visibleCount += batchSize;
      updateVisibility();
    });

    // Reset and recalc when filters change
    document
      .querySelectorAll(".portfolio-filters li")
      .forEach((filterBtn) => {
        filterBtn.addEventListener("click", () => {
          visibleCount = batchSize;
          // Give Isotope a moment to apply the filter
          setTimeout(updateVisibility, 50);
        });
      });

    // If Isotope is present, sync after arrange completes
    if (container._isotopeInstance && container._isotopeInstance.on) {
      container._isotopeInstance.on("arrangeComplete", updateVisibility);
    } else {
      // Retry once Isotope initializes
      setTimeout(() => {
        if (container._isotopeInstance && container._isotopeInstance.on) {
          container._isotopeInstance.on("arrangeComplete", updateVisibility);
          updateVisibility();
        }
      }, 200);
    }
  }

  window.addEventListener("load", initArticlesLoadMore);

  // Modern Bilingual Preloader Animation
  const preloader = document.querySelector("#preloader");
  
  if (preloader) {
    // Hide preloader when page is loaded
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.remove("visible");
        preloader.classList.add("hidden");
        
        setTimeout(() => {
          preloader.style.display = "none";
        }, 200);
      }, 500); // Shorten minimum preloader time for faster perceived load
    });
    
    // Optional: Hide preloader after minimum time even if page loads faster
    setTimeout(() => {
      if (preloader.classList.contains("visible")) {
        preloader.classList.remove("visible");
        preloader.classList.add("hidden");
        
        setTimeout(() => {
          preloader.style.display = "none";
        }, 200);
      }
    }, 1500); // Tighten maximum wait time
  }

  document.addEventListener("scroll", throttledScroll);
})();
