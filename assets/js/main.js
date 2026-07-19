/**
* Template Name: Tour
* Template URL: https://bootstrapmade.com/tour-bootstrap-travel-website-template/
* Updated: Jul 01 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  // ============================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================

  /**
   * 1. Pastikan semua tombol dengan ikon memiliki aria-label
   * (fallback jika terlewat di HTML)
   */
  document.querySelectorAll('.subscribe-btn:not([aria-label])').forEach(function(btn) {
    const hasIcon = btn.querySelector('i');
    const hasText = btn.textContent.trim().length > 0;
    
    if (hasIcon && !hasText) {
      btn.setAttribute('aria-label', 'Berlangganan newsletter');
    }
  });

  /**
   * 2. Pastikan semua link sosial media memiliki aria-label
   * (fallback jika terlewat di HTML)
   */
  document.querySelectorAll('.social-links a:not([aria-label])').forEach(function(link) {
    const icon = link.querySelector('i');
    if (icon) {
      const iconClass = icon.className;
      let label = 'Social media';
      
      // Deteksi platform dari kelas ikon
      if (iconClass.includes('twitter')) label = 'Twitter';
      else if (iconClass.includes('facebook')) label = 'Facebook';
      else if (iconClass.includes('instagram')) label = 'Instagram';
      else if (iconClass.includes('linkedin')) label = 'LinkedIn';
      else if (iconClass.includes('youtube')) label = 'YouTube';
      else if (iconClass.includes('whatsapp')) label = 'WhatsApp';
      else if (iconClass.includes('tiktok')) label = 'TikTok';
      else if (iconClass.includes('telegram')) label = 'Telegram';
      else if (iconClass.includes('pinterest')) label = 'Pinterest';
      else if (iconClass.includes('github')) label = 'GitHub';
      
      link.setAttribute('aria-label', label);
    }
  });

  /**
   * 3. Tambahkan keyboard support untuk tombol subscribe
   * (Enter/Spasi sudah otomatis support untuk <button>)
   */
  document.querySelectorAll('.subscribe-btn').forEach(function(btn) {
    // Pastikan type="submit" sudah benar
    if (!btn.hasAttribute('type')) {
      btn.setAttribute('type', 'submit');
    }
  });

  /**
   * 4. Pastikan semua link dengan target="_blank" memiliki rel="noopener noreferrer"
   * (untuk keamanan)
   */
  document.querySelectorAll('a[target="_blank"]:not([rel*="noopener"])').forEach(function(link) {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) {
      link.setAttribute('rel', rel + ' noopener noreferrer');
    }
  });

})();