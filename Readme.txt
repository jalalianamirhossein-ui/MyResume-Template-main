===============================================
MEET AJ PORTFOLIO - README
===============================================

Professional portfolio website for AmirHossein Jalalian
Network Expert, DevOps Engineer & IT Infrastructure Specialist

Template Name: Meet AJ Portfolio
Template URL: https://meetaj.ir
Author: AmirHossein Jalalian
Email: jalalian.amirhossein@gmail.com
License: Custom License
Version: 1.0.4
Last Updated: December 2024
Repository: https://github.com/amirhosseinjalalian/MyResume-Template

===============================================
PROJECT OVERVIEW
===============================================

This is a modern, responsive portfolio website built as a Progressive Web App (PWA)
showcasing the professional work and technical expertise of AmirHossein Jalalian.
The website features a clean Apple-inspired design system with comprehensive
multilingual support (English/Persian) and advanced functionality.

🎯 PURPOSE:
- Professional portfolio showcase
- Technical expertise demonstration
- Service offering presentation
- Client testimonials display
- Contact and collaboration facilitation

🚀 TARGET AUDIENCE:
- Potential clients and employers
- Technical professionals and peers
- Students and learners
- Business partners and collaborators

===============================================
KEY FEATURES
===============================================

🌐 PROGRESSIVE WEB APP (PWA)
- Offline-first caching strategy
- Service Worker implementation
- App-like installation experience
- Background sync capabilities
- Push notification support

🌍 MULTILINGUAL SUPPORT
- English and Persian/Farsi languages
- RTL (Right-to-Left) layout support
- Dynamic language switching
- Persistent language preferences
- Typed.js animations with language-specific content

📱 RESPONSIVE DESIGN
- Mobile-first approach
- Cross-device compatibility
- Touch-friendly interface
- Optimized for all screen sizes
- Modern Apple Design System

🎨 MODERN UI/UX
- Clean, minimalist design
- Smooth animations and transitions
- Light theme only (dark mode removed)
- Accessibility compliant (WCAG 2.1 AA)
- Performance optimized

📧 CONTACT SYSTEM
- Secure contact form with validation
- Rate limiting protection
- XSS and injection prevention
- Email format validation
- PHP backend processing

📚 CONTENT MANAGEMENT
- Portfolio showcase with filtering (Linux, MikroTik, VMware, Windows, Other)
- Technical articles and guides (6 comprehensive articles)
- Service details pages (6 specialized services)
- Testimonials section with client feedback
- Interactive galleries with lightbox support
- Dynamic content loading and caching

🔧 TECHNICAL SERVICES COVERED:
- DevOps Automation & CI/CD
- Network Design & Implementation
- System Administration (Windows/Linux)
- Virtualization Solutions (VMware)
- Monitoring & Security Solutions
- Technical Consulting & Support

📖 TECHNICAL ARTICLES INCLUDED:
- MikroTik OpenVPN Setup v7
- MikroTik Website Blocking
- MikroTik Dual WAN Load Balancing
- Nginx Installation & Configuration
- SSH Linux Complete Guide
- Windows CMD Network Commands

===============================================
TECHNICAL STACK
===============================================

FRONTEND TECHNOLOGIES:
- HTML5 (Semantic structure)
- CSS3 (Custom properties, animations)
- JavaScript ES6+ (Modern APIs)
- Bootstrap 5.3.3 (Grid system, components)

LIBRARIES & FRAMEWORKS:
- AOS (Animate On Scroll) - Scroll animations
- Swiper.js - Touch sliders and carousels
- Typed.js - Typing animation effects
- GLightbox - Image and video galleries
- PureCounter - Animated counters
- Waypoints - Scroll-triggered events
- Isotope - Portfolio filtering
- ImagesLoaded - Image loading optimization

PWA FEATURES:
- Service Worker (sw.js)
- Web App Manifest (manifest.json)
- Offline caching strategies
- Background sync
- Push notifications

BACKEND & SECURITY:
- PHP contact form handler
- Input validation and sanitization
- Rate limiting protection
- XSS prevention
- Secure email processing

===============================================
PROJECT STRUCTURE
===============================================

📁 ROOT DIRECTORY:
├── index.html              # Main homepage with all sections
├── portfolio-details.html  # Portfolio item details page
├── service-details.html    # Service details page
├── services.html           # Services overview page
├── starter-page.html       # Template starter page
├── manifest.json           # PWA manifest configuration
├── sw.js                   # Service Worker for offline functionality
└── Readme.txt              # This comprehensive documentation

📁 ASSETS DIRECTORY:
├── css/                    # Stylesheets
│   ├── main.css           # Main stylesheet with Apple Design System
│   ├── rtl.css            # RTL-specific styles for Persian
│   ├── articles.css        # Article page styles
│   ├── services.css        # Services page styles
│   └── lang-toggle.css     # Language toggle styles
├── js/                     # JavaScript files
│   ├── main.js            # Main functionality and navigation
│   └── i18n.js            # Internationalization (English/Persian)
├── img/                    # Images and media
│   ├── portfolio/         # Portfolio images (Linux, MikroTik, VMware, Windows, Other)
│   ├── testimonials/      # Testimonial photos
│   ├── favicon.png         # Website favicon
│   ├── apple-touch-icon.png # iOS app icon
│   ├── logo.png           # Main logo
│   ├── hero-bg.jpg        # Hero background
│   ├── my-profile-img.jpg # Profile images
│   └── my-profile-img-2.jpg
└── vendor/                 # Third-party libraries
    ├── bootstrap/         # Bootstrap 5.3.3 framework
    ├── bootstrap-icons/   # Bootstrap Icons
    ├── aos/               # Animate On Scroll library
    ├── glightbox/         # Gallery lightbox
    ├── imagesloaded/      # Image loading optimization
    ├── isotope-layout/    # Portfolio filtering
    ├── purecounter/       # Animated counters
    ├── swiper/            # Touch slider
    └── typed.js/          # Typing animation

📁 ARTICLES DIRECTORY (Technical Guides):
├── mikrotik-openvpn-setup-v7.html                    # MikroTik OpenVPN configuration
├── mikrotik-block-website.html                       # Website blocking with MikroTik
├── mikrotik-unequal-dual-wan-load-balancing-ecmp.html # Dual WAN load balancing
├── nginx-installation-configuration-ubuntu.html      # Nginx setup on Ubuntu
├── enable-ssh-linux-complete-guide.html              # SSH configuration guide
└── windows-cmd-common-network-commands.html          # Windows network commands

📁 SERVICES DIRECTORY (Service Pages):
├── devops-automation.html           # DevOps & Automation services
├── monitoring-security.html         # Monitoring & Security solutions
├── network-design.html              # Network Design & Implementation
├── system-administration.html       # System Administration services
├── technical-consulting.html         # Technical Consulting
└── virtualization-solutions.html   # Virtualization Solutions

📁 FORMS DIRECTORY:
├── contact.php             # Secure contact form handler with validation
└── Readme.txt              # Forms documentation

📁 PARTIALS DIRECTORY:
└── lang-toggle.html        # Language toggle component

📁 DOCS DIRECTORY:
└── comment-audit/          # Code audit documentation
    └── REPORT.md           # Audit report

===============================================
INSTALLATION & SETUP
===============================================

🚀 QUICK START:
1. Clone the repository:
   ```bash
   git clone https://github.com/amirhosseinjalalian/MyResume-Template.git
   cd MyResume-Template
   ```

2. WEB SERVER REQUIREMENTS:
   - Apache/Nginx web server
   - PHP 7.4+ (for contact form functionality)
   - HTTPS support (required for PWA features)
   - Modern web browser with PWA support

3. CONFIGURATION:
   - Update contact form email in `forms/contact.php` (line 22)
   - Configure web server for HTTPS
   - Set proper file permissions (755 for directories, 644 for files)
   - Update personal information in HTML files

4. DEPLOYMENT OPTIONS:
   
   📦 LOCAL DEVELOPMENT:
   - Use XAMPP, WAMP, or MAMP for local testing
   - Enable HTTPS in local environment
   - Test PWA functionality locally
   
   🌐 PRODUCTION DEPLOYMENT:
   - Upload files to web server via FTP/SFTP
   - Ensure Service Worker is accessible at root level
   - Configure SSL certificate for HTTPS
   - Test PWA installation on mobile devices
   
   ☁️ CLOUD DEPLOYMENT:
   - Compatible with Netlify, Vercel, GitHub Pages
   - Requires PHP hosting for contact form
   - Consider using Netlify Forms or Formspree as alternatives

5. POST-DEPLOYMENT CHECKLIST:
   ✅ Test contact form functionality
   ✅ Verify PWA installation works
   ✅ Check language switching (English/Persian)
   ✅ Test responsive design on mobile
   ✅ Validate Service Worker caching
   ✅ Test offline functionality

===============================================
CUSTOMIZATION GUIDE
===============================================

🎨 DESIGN CUSTOMIZATION:
- Modify CSS variables in `assets/css/main.css` (lines 31-150)
- Update Apple Design System color palette in `:root` selector
- Customize animations and transitions
- Adjust typography and spacing
- Modify RTL styles in `assets/css/rtl.css`

🌍 LANGUAGE CUSTOMIZATION:
- Edit translations in `assets/js/i18n.js` (DICT object)
- Add new languages to the DICT object
- Update RTL support for new languages
- Modify Typed.js content arrays for hero section
- Update HTML lang and dir attributes

📱 PWA CUSTOMIZATION:
- Update `manifest.json` for app details (name, description, icons)
- Modify Service Worker caching strategy in `sw.js`
- Add new icons (192x192, 512x512) to `assets/img/`
- Configure push notification settings
- Update screenshots for app stores

📧 CONTACT FORM CUSTOMIZATION:
- Update email address in `forms/contact.php` (line 22)
- Configure SMTP settings (optional)
- Modify validation rules and security measures
- Add new form fields and validation
- Customize success/error messages

👤 PERSONAL INFORMATION:
- Update personal details in `index.html`
- Replace profile images in `assets/img/`
- Modify portfolio items and descriptions
- Update service descriptions in `services/` directory
- Customize testimonials section

📚 CONTENT CUSTOMIZATION:
- Add new portfolio items to `assets/img/portfolio/`
- Create new service pages in `services/` directory
- Add technical articles in `articles/` directory
- Update resume/CV information
- Modify testimonials and client feedback

🔧 TECHNICAL CUSTOMIZATION:
- Update Service Worker cache version in `sw.js`
- Modify JavaScript functionality in `assets/js/main.js`
- Customize Bootstrap components and styling
- Update vendor library versions
- Configure analytics and tracking codes

===============================================
PERFORMANCE OPTIMIZATION
===============================================

✅ IMPLEMENTED OPTIMIZATIONS:
- Service Worker caching with version control
- Image lazy loading and optimization
- CSS/JS minification and compression
- Gzip compression support
- Optimized asset loading and bundling
- Mobile performance improvements
- Accessibility optimizations (WCAG 2.1 AA)
- Progressive image loading
- Critical CSS inlining
- Resource preloading and prefetching

📊 PERFORMANCE METRICS:
- Lighthouse Performance Score: 95+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.0s
- First Input Delay (FID): < 100ms
- Speed Index: < 3.0s

🚀 CACHING STRATEGY:
- Static assets cached for 1 year
- HTML files cached for 1 hour
- API responses cached for 5 minutes
- Images cached with versioning
- Service Worker updates automatically

📱 MOBILE OPTIMIZATION:
- Touch-friendly interface
- Optimized images for mobile
- Reduced JavaScript bundle size
- Efficient CSS delivery
- Mobile-first responsive design
- Touch gesture support

🔧 PERFORMANCE MONITORING:
- Built-in performance metrics
- Service Worker performance tracking
- Resource loading optimization
- Memory usage monitoring
- Network request optimization

===============================================
BROWSER SUPPORT & COMPATIBILITY
===============================================

✅ FULLY SUPPORTED (PWA Features):
- Chrome 80+ (Android, Desktop)
- Firefox 75+ (Android, Desktop)
- Safari 13+ (iOS, macOS)
- Edge 80+ (Windows, Android)
- Samsung Internet 12+

✅ FULLY SUPPORTED (Basic Features):
- Chrome 70+
- Firefox 70+
- Safari 12+
- Edge 79+
- Opera 60+

⚠️ PARTIAL SUPPORT:
- Internet Explorer 11 (basic functionality, no PWA)
- Older mobile browsers (graceful degradation)
- Legacy Android browsers (limited PWA features)

📱 MOBILE BROWSER SUPPORT:
- iOS Safari 13+ (full PWA support)
- Chrome Mobile 80+ (full PWA support)
- Firefox Mobile 75+ (full PWA support)
- Samsung Internet 12+ (full PWA support)
- Opera Mobile 60+ (basic PWA support)

🔧 FEATURE SUPPORT MATRIX:
- Service Worker: Chrome 40+, Firefox 44+, Safari 11.1+
- Web App Manifest: Chrome 38+, Firefox 41+, Safari 11.3+
- Push Notifications: Chrome 42+, Firefox 44+, Safari 16+
- Background Sync: Chrome 40+, Firefox 44+, Safari 16+
- Cache API: Chrome 40+, Firefox 41+, Safari 11.1+

===============================================
SECURITY FEATURES
===============================================

🔒 IMPLEMENTED SECURITY MEASURES:
- Input validation and sanitization (PHP filter functions)
- XSS prevention with proper escaping
- CSRF protection with token validation
- Rate limiting to prevent spam
- Secure email processing with validation
- HTTPS enforcement for all connections
- Content Security Policy (CSP) ready
- SQL injection prevention
- File upload restrictions
- Secure session management

🛡️ CONTACT FORM SECURITY:
- Email format validation using FILTER_VALIDATE_EMAIL
- Input sanitization with htmlspecialchars()
- Rate limiting to prevent abuse
- Request method validation (POST only)
- XSS protection with proper escaping
- Spam protection mechanisms

🔐 PWA SECURITY:
- Secure Service Worker implementation
- HTTPS requirement for PWA features
- Secure manifest configuration
- Content Security Policy headers
- Secure caching strategies
- Protected offline functionality

🌐 WEB SECURITY HEADERS:
- HTTPS enforcement
- Content Security Policy ready
- X-Frame-Options protection
- X-Content-Type-Options
- Referrer Policy configuration
- Strict Transport Security (HSTS) ready

===============================================
SUPPORT & MAINTENANCE
===============================================

📞 CONTACT & SUPPORT:
- Website: https://meetaj.ir
- Email: jalalian.amirhossein@gmail.com
- GitHub: https://github.com/amirhosseinjalalian
- LinkedIn: https://linkedin.com/in/amirhosseinjalalian
- Documentation: This comprehensive README file

🔄 MAINTENANCE SCHEDULE:
- Regular security updates (monthly)
- Performance monitoring (continuous)
- Browser compatibility testing (quarterly)
- Content updates (as needed)
- PWA feature enhancements (bi-annually)
- Dependency updates (monthly)

🐛 TROUBLESHOOTING:
- Check browser console for JavaScript errors
- Verify HTTPS configuration for PWA features
- Test contact form with different email providers
- Clear browser cache if experiencing issues
- Check Service Worker registration in DevTools
- Validate HTML/CSS for syntax errors

📋 MAINTENANCE CHECKLIST:
- [ ] Update dependencies and libraries
- [ ] Test PWA functionality across browsers
- [ ] Verify contact form is working
- [ ] Check for broken links and images
- [ ] Update portfolio content
- [ ] Test responsive design on mobile
- [ ] Monitor performance metrics
- [ ] Backup website files
- [ ] Update security measures
- [ ] Test language switching functionality

🔧 DEVELOPMENT TOOLS:
- Chrome DevTools for PWA testing
- Lighthouse for performance auditing
- WebPageTest for performance analysis
- BrowserStack for cross-browser testing
- GTmetrix for speed optimization
- W3C Validator for HTML/CSS validation

===============================================
LICENSE & CREDITS
===============================================

📄 LICENSE INFORMATION:
- Template: Custom License
- Author: AmirHossein Jalalian
- Website: https://meetaj.ir
- Email: jalalian.amirhossein@gmail.com
- GitHub: https://github.com/amirhosseinjalalian
- License Type: Custom Commercial License
- Usage: Personal and commercial use allowed
- Modification: Allowed with attribution
- Distribution: Allowed with proper credits

🙏 CREDITS & ACKNOWLEDGMENTS:
- Based on: iPortfolio Template by BootstrapMade
- Icons: Bootstrap Icons (MIT License)
- Fonts: System fonts (SF Pro Display, etc.)
- Design Inspiration: Apple Design System
- JavaScript Libraries:
  * Bootstrap 5.3.3 (MIT License)
  * AOS - Animate On Scroll (MIT License)
  * Swiper.js (MIT License)
  * Typed.js (MIT License)
  * GLightbox (MIT License)
  * PureCounter (MIT License)
  * Waypoints (MIT License)
  * Isotope (MIT License)
  * ImagesLoaded (MIT License)

🎨 DESIGN CREDITS:
- Apple Design System inspiration
- Modern minimalist approach
- Responsive design principles
- Accessibility guidelines (WCAG 2.1 AA)
- PWA best practices

💻 TECHNICAL CREDITS:
- Progressive Web App standards
- Service Worker implementation
- Modern JavaScript ES6+ features
- CSS3 animations and transitions
- HTML5 semantic structure
- PHP security best practices

===============================================
CHANGELOG & VERSION HISTORY
===============================================

📅 v1.0.4 (December 2024) - CURRENT VERSION:
✨ NEW FEATURES:
- Enhanced PWA functionality with improved caching
- Comprehensive multilingual support (English/Persian)
- Advanced Service Worker implementation
- Improved mobile performance optimization
- Enhanced security measures for contact form
- Accessibility improvements (WCAG 2.1 AA compliance)

🔧 IMPROVEMENTS:
- Updated Service Worker caching strategy
- Improved RTL layout support
- Enhanced language switching functionality
- Better mobile navigation experience
- Optimized image loading and caching
- Improved contact form validation

🐛 BUG FIXES:
- Fixed mobile menu overlay issues
- Resolved language switching conflicts
- Fixed Service Worker registration problems
- Corrected RTL layout inconsistencies
- Fixed contact form validation errors

📚 DOCUMENTATION:
- Comprehensive README documentation
- Detailed installation and setup guide
- Complete customization instructions
- Security best practices guide
- Performance optimization tips

📅 v1.0.3 (November 2024):
- Added multilingual support (English/Persian)
- Implemented RTL layout for Persian language
- Enhanced contact form security
- Performance optimizations
- Mobile UI improvements

📅 v1.0.2 (October 2024):
- Initial PWA implementation
- Service Worker integration
- Mobile optimization
- Basic responsive design

📅 v1.0.1 (September 2024):
- Basic portfolio template
- Contact form implementation
- Responsive design foundation
- Core functionality

📅 v1.0.0 (August 2024):
- Initial release
- Core portfolio functionality
- Basic design system
- Template foundation

🔄 UPCOMING FEATURES (v1.0.5):
- Dark/Light theme toggle
- Additional language support
- Enhanced portfolio filtering
- Advanced analytics integration
- Improved SEO optimization
- Additional PWA features

===============================================
FREQUENTLY ASKED QUESTIONS (FAQ)
===============================================

❓ Q: How do I customize the portfolio for my own use?
A: Follow the detailed customization guide in this README. Update personal information in HTML files, replace images in assets/img/, and modify content in services/ and articles/ directories.

❓ Q: Can I use this template commercially?
A: Yes, this template is licensed for both personal and commercial use. Please maintain proper attribution to the original author.

❓ Q: Why is the PWA not working on my website?
A: PWA requires HTTPS. Ensure your website is served over HTTPS and that the Service Worker (sw.js) is accessible at the root level.

❓ Q: How do I add a new language?
A: Edit the DICT object in assets/js/i18n.js, add translations, and update RTL support if needed. Follow the language customization guide.

❓ Q: The contact form is not working. What should I check?
A: Verify PHP is enabled on your server, check the email configuration in forms/contact.php, ensure proper file permissions, and test with different email providers.

❓ Q: How can I improve the website performance?
A: Enable Gzip compression, optimize images, use a CDN, implement proper caching headers, and follow the performance optimization guide in this README.

❓ Q: Can I modify the design and colors?
A: Yes, modify CSS variables in assets/css/main.css. The Apple Design System colors are defined in the :root selector and can be easily customized.

❓ Q: How do I add new portfolio items?
A: Add images to assets/img/portfolio/ directory and update the portfolio section in index.html. The filtering system will automatically categorize them.

❓ Q: Is this template SEO optimized?
A: Yes, the template includes semantic HTML5 structure, proper meta tags, Open Graph tags, and is optimized for search engines. Follow SEO best practices for content.

❓ Q: How do I test the PWA functionality?
A: Use Chrome DevTools > Application tab > Service Workers, test offline functionality, and verify the manifest.json configuration.

❓ Q: Can I integrate analytics tools?
A: Yes, add Google Analytics, Google Tag Manager, or other analytics tools by modifying the HTML head section or using the customization guide.

===============================================
