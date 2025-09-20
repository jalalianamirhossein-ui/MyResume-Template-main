/**
 * ===============================================
 * MEET AJ PORTFOLIO - INTERNATIONALIZATION (i18n)
 * ===============================================
 *
 * Language switching functionality for English and Persian/Farsi
 * Handles text translation, RTL support, and Typed.js integration
 *
 * Features:
 * - English/Persian language switching
 * - RTL (Right-to-Left) support
 * - Typed.js animation with language-specific content
 * - Smooth transitions between languages
 * - Persistent language preference
 *
 * Version: 7.0 - Stable
 * ===============================================
 */
(function () {
  if (window.__i18nInit) return;
  window.__i18nInit = true;
  let __busy = false;
  let __last = 0;

  const DICT = {
    en: {
      nav: {
        home: "Home",
        about: "About",
        resume: "Resume",
        portfolio: "Portfolio",
        services: "Services",
        testimonials: "Testimonials",
        contact: "Contact",
      },
      hero: {
        name: "AmirHossein Jalalian",
        iam: "I'm",
        roles:
          "Network Expert, DevOps Engineer, Freelancer, Systems Specialist, VMware Administrator",
      },
      about: {
        title: "About",
        p1: "I am Amirhossein Jalalian, a Network and IT Infrastructure Specialist with extensive experience in designing, managing, and optimizing enterprise systems. My mission is to deliver reliable, secure, and scalable solutions that enhance organizational efficiency while minimizing risks.",
        heading: "Computer Networks & IT Infrastructure Specialist",
        italic:
          "My expertise covers Microsoft Windows Server, Cisco, MikroTik, virtualization, and other IT-infrastructure technologies. With a results-oriented mindset, I approach every project with responsibility, precision, and teamwork.",
        birthday: "Birthday",
        phone: "Phone",
        email: "Email",
        location: "Location",
        degree: "Degree",
        status: "Status",
        birthday_value: "19 July 1999",
        location_value: "Tehran, Iran",
        degree_value: "Bachelor of IT Engineering",
        status_value: "Available for Collaboration",
        values:
          "I value integrity, discipline, patience, and accountability. I believe that respect for one’s craft and adherence to core values are the true foundation of long-term success in the IT field.",
        quote:
          "“Success is born of sustained effort, continuous learning, and faith in the journey.”",
      },
      skills: { title: "Skills" },
      resume: {
        title: "Resume",
        subtitle:
          "My academic background and professional work experience in computer networks and IT infrastructure.",
        education: "Education",
        experience: "Professional Experience",
        edu1_title: "DevOps Engineering Program",
        edu1_period: "2024",
        edu1_place: "Sanat Training Center",
        edu2_title: "LPIC-1",
        edu2_period: "2023",
        edu2_place:
          "Arzhang Higher Education Institute (Networking, Security, Virtualization, Storage, Programming, Web)",
        edu3_title: "LPIC-2",
        edu3_period: "2023",
        edu3_place:
          "Arzhang Higher Education Institute (Networking, Security, Virtualization, Storage, Programming, Web)",
        edu4_title: "Comprehensive VMware vSphere: Install, Configure, Manage",
        edu4_period: "2021",
        edu4_place: "Arzhang Higher Education Institute",
        edu5_title: "Bachelor’s in Computer Networks & Internet",
        edu5_period: "2020 - 2022",
        edu5_place:
          "University of Applied Science and Technology (Iran Informatics Branch)",
        edu6_title: "MCSA & Network Plus",
        edu6_period: "2018",
        edu6_place: "Arzhang Higher Education Institute",
        edu7_title: "CCNA 200-125",
        edu7_period: "2018",
        edu7_place: "Arzhang Higher Education Institute",
        edu8_title: "Associate Degree in Software Engineering",
        edu8_period: "2016 - 2018",
        edu8_place: "Shahid Shamsipour Technical and Vocational University",
        edu9_title: "Network Plus",
        edu9_period: "2013",
        edu9_place: "Arzhang Higher Education Institute",
        exp1_title: "DevOps & Network Infrastructure Specialist",
        exp1_period: "Sep 2018 – Present",
        exp1_place: "Newsha Drinks Co.",
        exp1_li1:
          "Designed and implemented virtualization infrastructure for all enterprise servers",
        exp1_li2:
          "Deployed SQL Server cluster with High Availability and Redgate monitoring",
        exp1_li3:
          "Implemented core Windows infrastructure services: Active Directory, DNS, NTP, DFS, WDS, WSUS",
        exp1_li4:
          "Deployed Nginx Proxy Manager for advanced HTTP/HTTPS traffic management and load balancing",
        exp1_li5:
          "Redesigned LAN structure with segmented VLANs and removed direct static IPs",
        exp1_li6:
          "Configured advanced Cisco switching (STP, VTP, VLAN, Port-Channel, Port Security)",
        exp1_li7:
          "Implemented secure Site-to-Site VPN tunnels between Tehran offices",
        exp1_li8:
          "Optimized Internet performance with MikroTik firewall and security rules",
        exp1_li9:
          "Installed Kaspersky Endpoint Security with centralized management console",
        exp1_li10: "Upgraded Jira from version 6 to 8 with full documentation",
        exp1_li11:
          "Upgraded HQ infrastructure with fiber backbone and improved datacenter",
        exp1_li12:
          "Integrated CCTV surveillance system with stable infrastructure",
        exp1_li13:
          "Enhanced VoIP infrastructure for reliable internal telephony",
        exp1_li14: "Implemented Zabbix with Telegram API alerts",
        exp1_li15: "Integrated Zabbix with Grafana for real-time dashboards",
        exp1_li16: "Deployed Cacti for graphical network traffic monitoring",
        exp1_li17: "Implemented NAS and automated backups with Veeam Backup",
        exp1_li18:
          "Created technical diagrams, documentation, and asset inventory",
        exp1_li19:
          "Configured CDN for improved website performance and security",
        exp1_li20:
          "Configured ArvanCloud with CDN, caching, and access security policies",
        exp1_li21: "Deployed MongoDB for internal NoSQL services",
        exp1_li22:
          "Implemented ABS NG for user behavior analytics and reporting",
        exp1_li23:
          "Configured Xray for traffic control, tunneling, and bypassing restrictions",
        exp1_li24:
          "Deployed Docker for isolated environments and faster service delivery",
        exp1_li25: "Configured Apache Maven for Java project build automation",
        exp1_li26: "Installed n8n for workflow automation",
        exp1_li27:
          "Developed Bash scripts for automation and server management",
        exp1_li28:
          "Migrated Windows web servers to Linux for performance and cost optimization",
        exp1_li29:
          "Configured load balancing across 5 Internet connections for stability",
        exp2_title: "Network Administrator",
        exp2_period: "Jul 2017 – Aug 2018",
        exp2_place:
          "University of Applied Science & Technology – Culture & Arts Unit 48",
        exp2_li1:
          "Installed, configured, and maintained network equipment (switches, routers, servers)",
        exp2_li2:
          "Performed passive networking tasks including cabling, termination, and rack installation",
        exp2_li3: "Troubleshot LAN/WAN/Internet connectivity issues",
        exp2_li4: "Installed software and hardware for end-users",
        exp2_li5: "Implemented CCTV surveillance systems",
        exp2_li6: "Applied security policies and kept systems updated",
      },
    },
    fa: {
      nav: {
        home: "خانه",
        about: "درباره من",
        resume: "رزومه",
        portfolio: "نمونه‌کارها",
        services: "خدمات من",
        testimonials: "دیدگاه‌ها",
        contact: "تماس با من",
      },
      hero: {
        name: "امیرحسین جلالیان",
        iam: "من",
        roles:
          "کارشناس شبکه، مهندس دواپس، فریلنسر، متخصص سیستم‌ها، مدیر VMware",
      },
      about: {
        title: "درباره من",
        p1: "من امیرحسین جلالیان هستم، متخصص شبکه و زیرساخت فناوری اطلاعات با تجربه گسترده در طراحی، مدیریت و بهینه‌سازی سیستم‌های سازمانی. مأموریت من، ایجاد راهکارهای پایدار، امن و مقیاس‌پذیر است که بهره‌وری سازمان‌ها را افزایش داده و ریسک‌ها را کاهش می‌دهد.",
        heading: "متخصص شبکه‌های کامپیوتری و زیرساخت IT",
        italic:
          "تجربه من شامل Windows Server، سیسکو، میکروتیک، مجازی‌سازی و سایر فناوری‌های زیرساختی است. با رویکرد نتیجه‌محور، هر پروژه را با مسئولیت‌پذیری، دقت و کار تیمی پیش می‌برم.",
        birthday: "تاریخ تولد",
        phone: "تلفن",
        email: "ایمیل",
        location: "مکان",
        degree: "مدرک تحصیلی",
        status: "وضعیت",
        birthday_value: "۲۸ تیر ۱۳۷۸",
        location_value: "تهران، ایران",
        degree_value: "کارشناسی مهندسی فناوری اطلاعات",
        status_value: "آماده همکاری",
        values:
          "به صداقت، انضباط، صبر و پاسخگویی اهمیت می‌دهم. باور دارم احترام به کار و پایبندی به ارزش‌های بنیادی، پایه موفقیت بلندمدت در حوزه IT است.",
        quote: "«موفقیت زاده تلاش مستمر، یادگیری پیوسته و ایمان به مسیر است.»",
      },
      skills: { title: "مهارت‌ها" },
      resume: {
        title: "رزومه",
        subtitle:
          "پیشینه تحصیلی و سوابق کاری من در حوزه شبکه‌های کامپیوتری و زیرساخت IT.",
        education: "تحصیلات",
        experience: "سوابق کاری",
        edu1_title: "برنامه مهندسی DevOps",
        edu1_period: "۲۰۲۴",
        edu1_place: "مرکز آموزش صنعت",
        edu2_title: "LPIC-1",
        edu2_period: "۲۰۲۳",
        edu2_place:
          "مؤسسه آموزش عالی ارژنگ (شبکه، امنیت، مجازی‌سازی، ذخیره‌سازی، برنامه‌نویسی، وب)",
        edu3_title: "LPIC-2",
        edu3_period: "۲۰۲۳",
        edu3_place:
          "مؤسسه آموزش عالی ارژنگ (شبکه، امنیت، مجازی‌سازی، ذخیره‌سازی، برنامه‌نویسی، وب)",
        edu4_title: "VMware vSphere جامع: نصب، پیکربندی، مدیریت",
        edu4_period: "۲۰۲۱",
        edu4_place: "مؤسسه آموزش عالی ارژنگ",
        edu5_title: "کارشناسی شبکه‌های کامپیوتری و اینترنت",
        edu5_period: "۲۰۲۰ تا ۲۰۲۲",
        edu5_place: "دانشگاه علمی‌کاربردی (شاخه انفورماتیک ایران)",
        edu6_title: "MCSA و Network Plus",
        edu6_period: "۲۰۱۸",
        edu6_place: "مؤسسه آموزش عالی ارژنگ",
        edu7_title: "CCNA 200-125",
        edu7_period: "۲۰۱۸",
        edu7_place: "مؤسسه آموزش عالی ارژنگ",
        edu8_title: "کاردانی مهندسی نرم‌افزار",
        edu8_period: "۲۰۱۶ تا ۲۰۱۸",
        edu8_place: "دانشگاه فنی و حرفه‌ای شهید شمسی‌پور",
        edu9_title: "Network Plus",
        edu9_period: "۲۰۱۳",
        edu9_place: "مؤسسه آموزش عالی ارژنگ",
        exp1_title: "متخصص DevOps و زیرساخت شبکه",
        exp1_period: "سپتامبر ۲۰۱۸ تا کنون",
        exp1_place: "شرکت نوشیدنی نیوشا",
        exp1_li1:
          "طراحی و پیاده‌سازی زیرساخت مجازی‌سازی برای تمام سرورهای سازمان",
        exp1_li2:
          "راه‌اندازی کلاستر SQL Server با قابلیت دسترس‌پذیری بالا و مانیتورینگ Redgate",
        exp1_li3:
          "استقرار سرویس‌های اصلی ویندوز: Active Directory، DNS، NTP، DFS، WDS، WSUS",
        exp1_li4:
          "استقرار Nginx Proxy Manager برای مدیریت پیشرفته ترافیک HTTP/HTTPS و Load Balancing",
        exp1_li5: "بازطراحی LAN با تفکیک VLAN و حذف IPهای استاتیک مستقیم",
        exp1_li6:
          "پیکربندی پیشرفته سوئیچینگ سیسکو (STP، VTP، VLAN، Port-Channel، Port Security)",
        exp1_li7: "پیاده‌سازی VPN سایت‌به‌سایت امن بین دفاتر تهران",
        exp1_li8: "بهینه‌سازی اینترنت با قوانین فایروال و امنیتی میکروتیک",
        exp1_li9: "نصب Kaspersky Endpoint Security با کنسول مدیریت متمرکز",
        exp1_li10: "ارتقای Jira از نسخه ۶ به ۸ همراه با مستندسازی کامل",
        exp1_li11: "ارتقای زیرساخت دفتر مرکزی با بک‌بُن فیبر و بهبود دیتاسنتر",
        exp1_li12: "یکپارچه‌سازی سامانه نظارتی دوربین‌ها با زیرساخت پایدار",
        exp1_li13: "تقویت زیرساخت VoIP برای مکالمات داخلی پایدار",
        exp1_li14: "پیاده‌سازی Zabbix با اعلان‌های Telegram API",
        exp1_li15: "یکپارچه‌سازی Zabbix با Grafana برای داشبوردهای بلادرنگ",
        exp1_li16: "استقرار Cacti برای مانیتورینگ گرافیکی ترافیک شبکه",
        exp1_li17: "پیاده‌سازی NAS و پشتیبان‌گیری خودکار با Veeam Backup",
        exp1_li18: "تولید دیاگرام‌های فنی، مستندسازی و فهرست‌برداری دارایی‌ها",
        exp1_li19: "پیکربندی CDN برای بهبود کارایی و امنیت وب‌سایت",
        exp1_li20: "پیکربندی ابر آروان با CDN، کش و سیاست‌های امنیت دسترسی",
        exp1_li21: "استقرار MongoDB برای سرویس‌های داخلی NoSQL",
        exp1_li22: "پیاده‌سازی ABS NG برای تحلیل رفتار کاربران و گزارش‌دهی",
        exp1_li23:
          "پیکربندی Xray برای کنترل ترافیک، تونل‌سازی و عبور از محدودیت‌ها",
        exp1_li24: "استقرار Docker برای محیط‌های ایزوله و تحویل سریع خدمات",
        exp1_li25: "پیکربندی Apache Maven برای خودکارسازی Build پروژه‌های Java",
        exp1_li26: "نصب n8n برای اتوماسیون جریان‌کار",
        exp1_li27: "توسعه اسکریپت‌های Bash برای اتوماسیون و مدیریت سرورها",
        exp1_li28:
          "مهاجرت سرورهای وب ویندوز به لینوکس جهت بهبود کارایی و کاهش هزینه",
        exp1_li29: "پیاده‌سازی توزیع بار روی ۵ اتصال اینترنت برای پایداری",
        exp2_title: "مدیر شبکه",
        exp2_period: "جولای ۲۰۱۷ – آگوست ۲۰۱۸",
        exp2_place: "دانشگاه علمی‌کاربردی – واحد فرهنگ و هنر ۴۸",
        exp2_li1: "نصب، پیکربندی و نگهداری تجهیزات شبکه (سوئیچ، روتر، سرور)",
        exp2_li2: "اجرای امور پسیو شبکه شامل کابل‌کشی، سربندی و نصب رک",
        exp2_li3: "رفع اشکال اتصال LAN/WAN/اینترنت",
        exp2_li4: "نصب نرم‌افزار و سخت‌افزار برای کاربران نهایی",
        exp2_li5: "پیاده‌سازی سامانه‌های نظارت تصویری (CCTV)",
        exp2_li6: "اعمال سیاست‌های امنیتی و به‌روزرسانی مستمر سیستم‌ها",
      },
    },
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const get = (dict, key) =>
    key.split(".").reduce((o, k) => (o ? o[k] : null), dict);

  function ensureRTL() {
    let link = $("#rtl-style");
    if (!link) {
      link = document.createElement("link");
      link.id = "rtl-style";
      link.rel = "stylesheet";
      link.href = "assets/css/rtl.css";
      link.disabled = true;
      document.head.appendChild(link);
    }
    return link;
  }

  function applyDict(lang) {
    const dict = DICT[lang];
    // Handle data-i18n attributes (if any)
    $$("[data-i18n]").forEach((el) => {
      const v = get(dict, el.dataset.i18n);
      if (v != null) {
        if (el.hasAttribute("data-i18n-html")) el.innerHTML = v;
        else el.textContent = v;
      }
    });

    // Handle data-en/data-fa attributes (existing implementation)
    $$("[data-en][data-fa]").forEach((el) => {
      // Skip purecounter and val elements to avoid breaking animations
      if (el.classList.contains("purecounter")) return;
      if (el.classList.contains("val")) return;

      const isFA = lang === "fa";
      el.textContent = isFA
        ? el.getAttribute("data-fa")
        : el.getAttribute("data-en");
    });
  }

  function reinitTyped(lang) {
    const el = document.querySelector("#hero .typed");
    if (!el) return;

    // Check for data-typed-items-fa attribute first
    let roles;
    if (lang === "fa" && el.hasAttribute("data-typed-items-fa")) {
      roles = el
        .getAttribute("data-typed-items-fa")
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    } else {
      roles = (get(DICT[lang], "hero.roles") || "")
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }

    if (window.Typed) {
      if (el._typed && el._typed.destroy) {
        try {
          el._typed.destroy();
        } catch (e) {
          // Error destroying Typed instance - handled silently
        }
      }
      if (roles.length > 0) {
        try {
          const t = new Typed(el, {
            strings: roles,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
          });
          el._typed = t;
        } catch (e) {
          // Error initializing Typed - fallback to first role
          el.textContent = roles[0] || el.textContent;
        }
      }
    } else {
      el.textContent = roles[0] || el.textContent;
    }
  }

  function setLang(lang) {
    if (__busy) return;
    __busy = true;
    const isFA = lang === "fa";
    try {
      // Add transition animation to button
      const btn = $("#lang-toggle");
      const content = btn?.querySelector(".lang-content");
      const textEl = btn?.querySelector(".lang-text");
      const flagEl = btn?.querySelector(".lang-flag");

      if (content && textEl) {
        // Start transition animation
        content.classList.add("transitioning-out");

        setTimeout(() => {
          // Update content: show target language (opposite of current)
          textEl.textContent = isFA
            ? textEl.getAttribute("data-fa")
            : textEl.getAttribute("data-en");

          // Apply language changes
          document.documentElement.lang = lang;
          document.documentElement.dir = isFA ? "rtl" : "ltr";
          ensureRTL().disabled = !isFA;

          // End transition animation
          content.classList.remove("transitioning-out");
          content.classList.add("transitioning-in");

          setTimeout(() => {
            content.classList.remove("transitioning-in");
          }, 200);
        }, 100);
      } else {
        // Fallback for old button structure
        document.documentElement.lang = lang;
        document.documentElement.dir = isFA ? "rtl" : "ltr";
        ensureRTL().disabled = !isFA;
      }

      applyDict(lang);
      reinitTyped(lang);
      localStorage.setItem("lang", lang);

      // Mark as used
      if (!localStorage.getItem("lang_used")) {
        localStorage.setItem("lang_used", "true");
      }
    } catch (e) {
      // Error setting language - handled silently
    } finally {
      setTimeout(() => {
        __busy = false;
      }, 300);
    }
  }

  // Language transition with page refresh and fade from top
  function startLanguageTransition(currentLang, nextLang) {
    const html = document.documentElement;

    // Start fade out animation
    html.classList.add("language-transition", "fade-out");

    setTimeout(() => {
      // Change language
      setLang(nextLang);

      // Change direction attribute
      const isMovingToRTL = nextLang === "fa";
      html.dir = isMovingToRTL ? "rtl" : "ltr";
      html.lang = nextLang;

      // Refresh page
      window.location.reload();
    }, 400);
  }

  function stripAndBind() {
    let btn = $("#lang-toggle");
    if (!btn) return;
    const clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
    btn = clone;
    btn.__i18nBound = true;

    // Enhanced click handler with visual feedback
    btn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const now = Date.now();
        if (now - __last < 250) return;
        __last = now;

        // Add click animation
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
          btn.style.transform = "";
        }, 100);

        const currentLang = document.documentElement.lang;
        const next = currentLang === "fa" ? "en" : "fa";

        // Start language transition animation
        startLanguageTransition(currentLang, next);
      },
      { capture: true, passive: false }
    );

    // Simple hover effects
    btn.addEventListener("mouseenter", function () {
      btn.style.transform = "translateY(-1px)";
    });

    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "";
    });

    // Add touch support for mobile
    if ("ontouchstart" in window) {
      btn.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          btn.style.transform = "scale(0.95)";
        },
        { passive: false }
      );

      btn.addEventListener(
        "touchend",
        function (e) {
          e.preventDefault();
          btn.style.transform = "";
          const now = Date.now();
          if (now - __last < 250) return;
          __last = now;

          const currentLang = document.documentElement.lang;
          const next = currentLang === "fa" ? "en" : "fa";

          // Start language transition animation
          startLanguageTransition(currentLang, next);
        },
        { passive: false }
      );
    }

    // Add keyboard support
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });

    // Add focus management
    btn.addEventListener("focus", function () {
      btn.style.outline = "3px solid rgba(0, 80, 160, 0.5)";
      btn.style.outlineOffset = "2px";
    });

    btn.addEventListener("blur", function () {
      btn.style.outline = "";
      btn.style.outlineOffset = "";
    });
  }

  function init() {
    ensureRTL();
    const saved =
      localStorage.getItem("lang") ||
      (navigator.language.startsWith("fa") ? "fa" : "en");

    // Initialize button with proper structure if needed
    const btn = $("#lang-toggle");
    if (btn && !btn.querySelector(".lang-content")) {
      // Convert old button structure to new one
      const isFA = saved === "fa";
      btn.innerHTML = `
        <div class="lang-content">
          <span class="lang-text" data-en="English" data-fa="فارسی">${
            isFA ? "English" : "فارسی"
          }</span>
        </div>
        <div class="lang-glow"></div>
      `;
    }

    // Ensure button content is visible immediately
    const content = btn?.querySelector(".lang-content");
    if (content) {
      content.style.opacity = "1";
      content.style.transform = "scale(1)";
      content.classList.remove("transitioning-out", "transitioning-in");
    }

    setLang(saved);
    stripAndBind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
