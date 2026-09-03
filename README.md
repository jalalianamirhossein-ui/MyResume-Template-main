# MEET AJ PORTFOLIO

Professional portfolio website for AmirHossein Jalalian
Network Expert, DevOps Engineer & IT Infrastructure Specialist

**Template Name:** Meet AJ Portfolio  
**Template URL:** https://meetaj.ir  
**Author:** AmirHossein Jalalian  
**License:** https://meetaj.ir  
**Version:** 1.0.4  
**Last Updated:** December 2024

===============================================
MEET AJ PORTFOLIO - README
===============================================

Professional portfolio website for AmirHossein Jalalian
Network Expert, DevOps Engineer & IT Infrastructure Specialist

Template Name: Meet AJ Portfolio
Template URL: https://meetaj.ir
Author: AmirHossein Jalalian
License: https://meetaj.ir
Version: 1.0.4
Last Updated: December 2024

## PROJECT OVERVIEW

This is a modern, responsive portfolio website built as a Progressive Web App (PWA) showcasing the professional work and technical expertise of AmirHossein Jalalian. The website features a clean Apple-inspired design system with comprehensive multilingual support and advanced functionality.

## KEY FEATURES

### 🌐 PROGRESSIVE WEB APP (PWA)

- Offline-first caching strategy
- Service Worker implementation
- App-like installation experience
- Background sync capabilities
- Push notification support

### 🌍 MULTILINGUAL SUPPORT

- English and Persian/Farsi languages
- RTL (Right-to-Left) layout support
- Dynamic language switching
- Persistent language preferences
- Typed.js animations with language-specific content

### 📱 RESPONSIVE DESIGN

- Mobile-first approach
- Cross-device compatibility
- Touch-friendly interface
- Optimized for all screen sizes
- Modern Apple Design System

### 🎨 MODERN UI/UX

- Clean, minimalist design
- Smooth animations and transitions
- Dark/Light theme support
- Accessibility compliant (WCAG 2.1 AA)
- Performance optimized

### 📧 CONTACT SYSTEM

- Secure contact form with validation
- Rate limiting protection
- XSS and injection prevention
- Email format validation
- PHP backend processing

### 📚 CONTENT MANAGEMENT

- Portfolio showcase with filtering
- Technical articles and guides
- Service details pages
- Testimonials section
- Interactive galleries

## TECHNICAL STACK

### FRONTEND TECHNOLOGIES:

- HTML5 (Semantic structure)
- CSS3 (Custom properties, animations)
- JavaScript ES6+ (Modern APIs)
- Bootstrap 5.3.3 (Grid system, components)

### LIBRARIES & FRAMEWORKS:

- AOS (Animate On Scroll) - Scroll animations
- Swiper.js - Touch sliders and carousels
- Typed.js - Typing animation effects
- GLightbox - Image and video galleries
- PureCounter - Animated counters
- Waypoints - Scroll-triggered events
- Isotope - Portfolio filtering
- ImagesLoaded - Image loading optimization

### PWA FEATURES:

- Service Worker (sw.js)
- Web App Manifest (manifest.json)
- Offline caching strategies
- Background sync
- Push notifications

### BACKEND & SECURITY:

- PHP contact form handler
- Input validation and sanitization
- Rate limiting protection
- XSS prevention
- Secure email processing

## PROJECT STRUCTURE

```
📁 ROOT DIRECTORY:
├── index.html              # Main homepage
├── portfolio-details.html  # Portfolio item details
├── service-details.html    # Service details page
├── starter-page.html       # Template starter page
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
└── README.md               # This documentation

📁 ASSETS DIRECTORY:
├── css/                    # Stylesheets
│   ├── main.css           # Main stylesheet
│   ├── rtl.css            # RTL-specific styles
│   └── articles.css        # Article page styles
├── js/                     # JavaScript files
│   ├── main.js            # Main functionality
│   └── i18n.js            # Internationalization
├── img/                    # Images and media
│   ├── portfolio/         # Portfolio images
│   └── testimonials/      # Testimonial photos
└── vendor/                 # Third-party libraries
    ├── bootstrap/         # Bootstrap framework
    ├── aos/               # Animate On Scroll
    ├── swiper/            # Touch slider
    ├── glightbox/         # Gallery lightbox
    ├── typed.js/          # Typing animation
    └── [other libraries]  # Additional dependencies

📁 ARTICLES DIRECTORY:
├── mikrotik-openvpn-setup-v7.html
├── mikrotik-block-website.html
├── mikrotik-unequal-dual-wan-load-balancing-ecmp.html
├── nginx-installation-configuration-ubuntu.html
├── enable-ssh-linux-complete-guide.html
└── windows-cmd-common-network-commands.html

📁 FORMS DIRECTORY:
├── contact.php             # Contact form handler
└── Readme.txt              # Forms documentation
```

## INSTALLATION & SETUP

### 1. CLONE OR DOWNLOAD:

- Download the project files
- Extract to your web server directory

### 2. WEB SERVER REQUIREMENTS:

- Apache/Nginx web server
- PHP 7.4+ (for contact form)
- HTTPS support (required for PWA)

### 3. CONFIGURATION:

- Update contact form email in forms/contact.php
- Configure web server for HTTPS
- Set proper file permissions

### 4. DEPLOYMENT:

- Upload files to web server
- Ensure Service Worker is accessible
- Test PWA functionality

## CUSTOMIZATION GUIDE

### 🎨 DESIGN CUSTOMIZATION:

- Modify CSS variables in main.css
- Update color scheme in :root selector
- Customize Apple Design System colors
- Adjust animations and transitions

### 🌍 LANGUAGE CUSTOMIZATION:

- Edit translations in assets/js/i18n.js
- Add new languages to DICT object
- Update RTL support for new languages
- Modify Typed.js content arrays

### 📱 PWA CUSTOMIZATION:

- Update manifest.json for app details
- Modify Service Worker caching strategy
- Add new icons and screenshots
- Configure push notification settings

### 📧 CONTACT FORM CUSTOMIZATION:

- Update email address in contact.php
- Configure SMTP settings (optional)
- Modify validation rules
- Add new form fields

## PERFORMANCE OPTIMIZATION

### ✅ IMPLEMENTED OPTIMIZATIONS:

- Service Worker caching
- Image lazy loading
- CSS/JS minification
- Gzip compression support
- Optimized asset loading
- Mobile performance improvements
- Accessibility optimizations

### 📊 PERFORMANCE METRICS:

- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.0s

## BROWSER SUPPORT

### ✅ FULLY SUPPORTED:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### ⚠️ PARTIAL SUPPORT:

- Internet Explorer 11 (basic functionality)
- Older mobile browsers (graceful degradation)

## SECURITY FEATURES

### 🔒 IMPLEMENTED SECURITY:

- Input validation and sanitization
- XSS prevention
- CSRF protection
- Rate limiting
- Secure email processing
- HTTPS enforcement
- Content Security Policy ready

## SUPPORT & MAINTENANCE

### 📞 SUPPORT:

- Website: https://meetaj.ir
- Email: jalalian.amirhossein@gmail.com
- Documentation: This README file

### 🔄 MAINTENANCE:

- Regular security updates
- Performance monitoring
- Browser compatibility testing
- Content updates
- PWA feature enhancements

## LICENSE & CREDITS

### 📄 LICENSE:

- Template: Custom License
- Author: AmirHossein Jalalian
- Website: https://meetaj.ir

### 🙏 CREDITS:

- Based on: iPortfolio Template by BootstrapMade
- Icons: Bootstrap Icons
- Fonts: System fonts (SF Pro Display, etc.)
- Design Inspiration: Apple Design System

## CHANGELOG

### v1.0.4 (December 2024):

- Enhanced PWA functionality
- Improved mobile performance
- Updated Service Worker caching
- Added comprehensive documentation
- Security improvements
- Accessibility enhancements

### v1.0.3 (November 2024):

- Added multilingual support
- Implemented RTL layout
- Enhanced contact form security
- Performance optimizations

### v1.0.2 (October 2024):

- Initial PWA implementation
- Service Worker integration
- Mobile optimization

### v1.0.1 (September 2024):

- Basic portfolio template
- Contact form implementation
- Responsive design

### v1.0.0 (August 2024):

- Initial release
- Core functionality
- Basic design system

## PRELOADER COMPONENT

Modern bilingual preloader component with RTL/LTR support and CSS animations.

### Features:

- ✅ **Bilingual**: Full Persian (RTL) and English (LTR) support
- ✅ **CSS Animations**: High performance and smooth
- ✅ **Responsive**: Compatible with all screen sizes
- ✅ **Brand Colors**: Uses primary color #2563eb
- ✅ **Dark Mode**: Dark mode support
- ✅ **Accessibility**: Reduced motion support
- ✅ **Typography**: Optimized fonts for Persian and Latin

### Usage:

#### React Component:

```jsx
import Preloader from "./Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en"); // 'en' or 'fa'

  return <Preloader isVisible={isLoading} language={language} />;
}
```

#### HTML:

```html
<div id="preloader" class="preloader-overlay visible">
  <div class="preloader-container ltr">
    <div class="preloader-spinner">
      <div class="spinner-circle">
        <div class="spinner-inner"></div>
      </div>
    </div>
    <div class="preloader-text">
      <span class="loading-text">Loading...</span>
    </div>
    <div class="preloader-progress">
      <div class="progress-line"></div>
    </div>
  </div>
</div>
```

### Props:

| Prop        | Type    | Default | Description                      |
| ----------- | ------- | ------- | -------------------------------- |
| `isVisible` | boolean | `true`  | Show or hide preloader           |
| `language`  | string  | `'en'`  | Site language (`'en'` or `'fa'`) |

### CSS Classes:

- `.preloader-overlay` - Background layer
- `.preloader-container` - Main container
- `.preloader-spinner` - Spinning animation
- `.preloader-text` - Loading text
- `.preloader-progress` - Progress bar
- `.rtl` - Right-to-left (Persian)
- `.ltr` - Left-to-right (English)
- `.visible` - Show preloader
- `.hidden` - Hide preloader

### Customization:

```css
:root {
  --primary-color: #2563eb;
  --primary-color-light: rgba(37, 99, 235, 0.1);
}
```

### Browser Support:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

### Performance:

- ⚡ Pure CSS animations (no JavaScript)
- 🎯 Optimized GPU usage
- 📱 Mobile optimized
- ♿ Reduced motion support
