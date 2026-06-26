/* vital-animations.js — Vital Computers */
(function () {
  'use strict';

  // ============================================================
  // NAV DATA
  // ============================================================
  var NAV_DATA = [
    { label: 'Home', href: 'index.html', mega: false },
    {
      label: 'Solutions', href: 'solutions.html', mega: true,
      heading: 'Enterprise ICT Solutions',
      desc: 'AI-ready infrastructure, business computing, imaging systems, and cybersecurity — end-to-end technology designed for organisations that demand performance.',
      links: [
        { l: 'Enterprise Infrastructure', h: 'solutions.html' },
        { l: 'Business Computing', h: 'solutions.html' },
        { l: 'Imaging & Printing', h: 'solutions.html' },
        { l: 'Software & Services', h: 'solutions.html' },
        { l: 'Cybersecurity', h: 'solutions.html' }
      ]
    },
    {
      label: 'Vendors', href: 'vendors.html', mega: true,
      heading: 'Our Global OEM Partners',
      desc: 'Partnering with world-leading technology brands to deliver certified, warranty-backed enterprise solutions with full local support.',
      links: [
        { l: 'Dell Technologies', h: 'vendors.html' },
        { l: 'HP Inc.', h: 'vendors.html' },
        { l: 'Lenovo', h: 'vendors.html' },
        { l: 'Kaspersky Security', h: 'vendors.html' },
        { l: 'Veeam Software', h: 'vendors.html' },
        { l: 'Microsoft Licensing', h: 'vendors.html' }
      ]
    },
    {
      label: 'Delivering Value', href: 'value.html', mega: true,
      heading: 'Why We Deliver More',
      desc: 'Certified engineers, direct OEM partnerships, PRAZ registration, and a 12+ year track record serving government, NGOs, and corporate Zimbabwe.',
      links: [
        { l: 'Our Certifications', h: 'value.html' },
        { l: 'Service Approach', h: 'value.html' },
        { l: 'Client Success Stories', h: 'value.html' },
        { l: 'Procurement Capability', h: 'value.html' }
      ]
    },
    {
      label: 'About', href: 'about.html', mega: true,
      heading: 'Who We Are',
      desc: "Zimbabwe’s trusted ICT partner for over a decade — designing, deploying, and supporting technology that transforms how organisations operate.",
      links: [
        { l: 'About Vital Computers', h: 'about.html' },
        { l: 'Our Mission & Values', h: 'about.html' },
        { l: 'Partner With Us', h: 'partner.html' }
      ]
    },
    {
      label: 'News', href: 'news.html', mega: true,
      heading: 'Latest from Vital Computers',
      desc: "Technology insights, company updates, product launches, and industry news from Zimbabwe’s leading ICT solutions provider.",
      links: [
        { l: 'Technology News', h: 'news.html' },
        { l: 'Company Updates', h: 'news.html' },
        { l: 'Product Announcements', h: 'news.html' },
        { l: 'Industry Insights', h: 'news.html' }
      ]
    }
  ];

  // ============================================================
  // PAGE TRANSITION
  // ============================================================
  var overlay;

  function insertOverlay() {
    overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      overlay.innerHTML = '<div class="pto-line"></div>';
      document.body.insertBefore(overlay, document.body.firstChild);
    }
    overlay.style.transform = 'translateY(-100%)';
    overlay.style.transition = 'none';
    overlay.style.pointerEvents = 'none';
  }

  function pageEntry() {
    if (!overlay) return;
    overlay.style.transition = 'none';
    overlay.style.transform = 'translateY(0)';
    overlay.style.pointerEvents = 'all';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.transition = 'transform 550ms cubic-bezier(0.76, 0, 0.24, 1)';
        overlay.style.transform = 'translateY(-100%)';
        overlay.addEventListener('transitionend', function () {
          overlay.style.pointerEvents = 'none';
        }, { once: true });
      });
    });
  }

  function bindPageTransitions() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link._vsBound) return;
      var href = link.getAttribute('href') || '';
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http') ||
        href.startsWith('//')
      ) return;
      link._vsBound = true;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var dest = href;
        overlay.style.transition = 'transform 450ms cubic-bezier(0.76, 0, 0.24, 1)';
        overlay.style.transform = 'translateY(0)';
        overlay.style.pointerEvents = 'all';
        overlay.addEventListener('transitionend', function () {
          window.location.href = dest;
        }, { once: true });
      });
    });
  }

  // ============================================================
  // MEGA NAV BUILDER
  // ============================================================
  function buildMegaNav() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    var linksHtml = NAV_DATA.map(function (item) {
      var isActive = currentPage === item.href;
      var activeClass = isActive ? ' class="active"' : '';

      if (!item.mega) {
        return '<li><a href="' + item.href + '"' + activeClass + '>' + item.label + '</a></li>';
      }

      var linksInner = item.links.map(function (link) {
        return (
          '<li><a href="' + link.h + '">' +
            '<span class="mld"></span>' + link.l +
          '</a></li>'
        );
      }).join('');

      var arrowSvg = (
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"/>' +
        '</svg>'
      );

      return (
        '<li class="nav__mega-item">' +
          '<a href="' + item.href + '"' + activeClass + '>' +
            item.label + '<span class="mega-chevron"></span>' +
          '</a>' +
          '<div class="nav__mega-panel">' +
            '<div class="nav__mega-left">' +
              '<div>' +
                '<div class="nav__mega-title">' + item.label + '</div>' +
                '<div class="nav__mega-heading">' + item.heading + '</div>' +
                '<div class="nav__mega-desc">' + item.desc + '</div>' +
              '</div>' +
              '<a href="' + item.href + '" class="nav__mega-browse">' +
                'Browse ' + item.label + ' ' + arrowSvg +
              '</a>' +
            '</div>' +
            '<div class="nav__mega-right">' +
              '<div class="nav__mega-links-label">Quick Links</div>' +
              '<ul class="nav__mega-links">' + linksInner + '</ul>' +
            '</div>' +
          '</div>' +
        '</li>'
      );
    }).join('');

    navbar.innerHTML =
      '<a href="index.html" class="nav__logo">' +
        '<img src="logo.png" alt="Vital Computers" class="nav__logo-img">' +
      '</a>' +
      '<ul class="nav__links">' + linksHtml + '</ul>' +
      '<div class="nav__actions">' +
        '<a href="index.html#contact" class="btn btn--sm btn--nav-outline">Request a Quote</a>' +
        '<a href="solutions.html" class="btn btn--sm btn--pink">Explore Solutions</a>' +
        '<button class="hamburger" aria-label="Menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';

    // Rebuild mobile nav
    var mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      var mobileLinks = NAV_DATA.map(function (item) {
        return '<a href="' + item.href + '">' + item.label + '</a>';
      }).join('');
      mobileNav.innerHTML =
        mobileLinks +
        '<div class="nav__mobile-cta">' +
          '<a href="index.html#contact" class="btn btn--pink" style="text-align:center">Request a Quote</a>' +
          '<a href="solutions.html" class="btn btn--outline-dark" style="text-align:center">Explore Solutions</a>' +
        '</div>';

      var hamburger = navbar.querySelector('.hamburger');
      if (hamburger) {
        hamburger.addEventListener('click', function () {
          mobileNav.classList.toggle('open');
        });
      }
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileNav.classList.remove('open');
        });
      });
    }
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  function initScrollAnimations() {
    var upGroups = [
      '.value-props__grid',
      '.tcard-grid',
      '.blog-grid',
      '.sol-grid',
      '.diff-grid',
      '.wp-cards',
      '.about-img-grid',
      '.related-grid'
    ];

    // Stagger children inside grid containers
    upGroups.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (grid) {
        var children = grid.children;
        for (var i = 0; i < children.length; i++) {
          if (!children[i].hasAttribute('data-vs')) {
            children[i].setAttribute('data-vs', 'up');
          }
          if (!children[i].hasAttribute('data-vsd') && i < 6) {
            children[i].setAttribute('data-vsd', String(i + 1));
          }
        }
      });
    });

    // Individual up elements
    var upSingles = [
      '.split-card',
      '.section-header',
      '.value-props__label',
      '.value-props__heading',
      '.value-props__sub',
      '.news-card',
      '.sol-featured__card',
      '.cta-glass',
      '.article-body__inner > h2',
      '.article-body__inner > h3',
      '.article-body__inner > blockquote'
    ];
    upSingles.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.hasAttribute('data-vs')) el.setAttribute('data-vs', 'up');
      });
    });

    // value-props label/heading/sub stagger
    var vpLabel = document.querySelector('.value-props__label');
    var vpHeading = document.querySelector('.value-props__heading');
    var vpSub = document.querySelector('.value-props__sub');
    if (vpLabel) { vpLabel.setAttribute('data-vs', 'up'); }
    if (vpHeading) { vpHeading.setAttribute('data-vs', 'up'); vpHeading.setAttribute('data-vsd', '1'); }
    if (vpSub) { vpSub.setAttribute('data-vs', 'up'); vpSub.setAttribute('data-vsd', '2'); }

    // statement inner children stagger
    document.querySelectorAll('.statement__inner').forEach(function (el) {
      Array.from(el.children).forEach(function (child, i) {
        if (!child.hasAttribute('data-vs')) {
          child.setAttribute('data-vs', 'up');
          if (i < 6) child.setAttribute('data-vsd', String(i + 1));
        }
      });
    });

    // Scale-in elements
    ['.fullbleed__content', '.partner-logo-item', '[class*="logo-grid__item"]'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.hasAttribute('data-vs')) el.setAttribute('data-vs', 'in');
      });
    });

    // Slide-from-left elements
    ['.cta-link', '.timeline__item'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.hasAttribute('data-vs')) el.setAttribute('data-vs', 'right');
      });
    });

    // Observe all tagged elements
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-vs]').forEach(function (el) {
        el.classList.add('vs-in');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('vs-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-vs]').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================================
  // RIPPLE
  // ============================================================
  function initRipples() {
    document.querySelectorAll('.btn, .nav__mega-browse, button').forEach(function (el) {
      if (el._vsRipple) return;
      el._vsRipple = true;
      var cs = window.getComputedStyle(el);
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.addEventListener('click', function (e) {
        var rect = el.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 2;
        var ripple = document.createElement('span');
        ripple.className = 'vs-ripple';
        ripple.style.cssText =
          'width:' + size + 'px;height:' + size + 'px;' +
          'left:' + (e.clientX - rect.left - size / 2) + 'px;' +
          'top:' + (e.clientY - rect.top - size / 2) + 'px;';
        el.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
      });
    });
  }

  // ============================================================
  // NAVBAR SCROLL
  // ============================================================
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('nav--scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // ============================================================
  // HERO PARALLAX
  // ============================================================
  function initHeroParallax() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var bg = hero.querySelector('.hero__bg');
    if (!bg) return;

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var mx = (x - 0.5) * -14;
      var my = (y - 0.5) * -9;
      bg.style.transition = 'transform 0.12s linear';
      bg.style.transform = 'scale(1.08) translate(' + mx + 'px, ' + my + 'px)';
    });

    hero.addEventListener('mouseleave', function () {
      bg.style.transition = 'transform 0.6s ease';
      bg.style.transform = '';
    });
  }

  // ============================================================
  // QUOTE REQUEST MODAL
  // ============================================================
  function buildQuoteModal() {
    if (document.getElementById('raq-backdrop')) return;

    var el = document.createElement('div');
    el.id = 'raq-backdrop';
    el.setAttribute('role', 'presentation');
    el.innerHTML =
      '<div id="raq-modal" role="dialog" aria-modal="true" aria-labelledby="raq-title">' +
        '<button id="raq-close" aria-label="Close dialog">×</button>' +
        '<div class="raq-header">' +
          '<p class="raq-label">Get in Touch</p>' +
          '<h2 id="raq-title">Request a Quote</h2>' +
          '<p class="raq-desc">Tell us about your technology needs and our team will respond within 24 hours.</p>' +
        '</div>' +
        '<form id="raqForm" novalidate>' +
          '<div class="raq-grid">' +
            '<div class="raq-field">' +
              '<label for="raq-name">Full Name <span class="raq-req">*</span></label>' +
              '<input type="text" id="raq-name" name="name" placeholder="Your full name" required>' +
            '</div>' +
            '<div class="raq-field">' +
              '<label for="raq-company">Company / Organisation</label>' +
              '<input type="text" id="raq-company" name="company" placeholder="Organisation name">' +
            '</div>' +
            '<div class="raq-field">' +
              '<label for="raq-email">Email Address <span class="raq-req">*</span></label>' +
              '<input type="email" id="raq-email" name="email" placeholder="your@email.com" required>' +
            '</div>' +
            '<div class="raq-field">' +
              '<label for="raq-phone">Phone Number</label>' +
              '<input type="tel" id="raq-phone" name="phone" placeholder="+263 ...">' +
            '</div>' +
          '</div>' +
          '<div class="raq-field">' +
            '<label for="raq-message">What are your technology needs?</label>' +
            '<textarea id="raq-message" name="message" placeholder="Describe your requirements, infrastructure needs, or products you\'re interested in..."></textarea>' +
          '</div>' +
          '<button type="submit" class="btn btn--pink raq-submit">Send Request</button>' +
        '</form>' +
        '<div id="raq-success">' +
          '<div class="raq-success-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="#E5007D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>' +
            '</svg>' +
          '</div>' +
          '<h3>Request Sent!</h3>' +
          '<p>Thank you — our team will reach out within 24 hours.</p>' +
          '<button class="btn btn--nav-outline raq-close-success">Close</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);

    var backdrop = el;
    var modal = document.getElementById('raq-modal');
    var closeBtn = document.getElementById('raq-close');
    var form = document.getElementById('raqForm');
    var success = document.getElementById('raq-success');
    var lastFocus = null;

    function openModal() {
      lastFocus = document.activeElement;
      backdrop.classList.add('raq-open');
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        var first = modal.querySelector('input');
        if (first) first.focus();
      }, 120);
    }

    function closeModal() {
      backdrop.classList.remove('raq-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
      setTimeout(function () {
        form.reset();
        form.style.display = '';
        success.style.display = 'none';
        var btn = form.querySelector('.raq-submit');
        if (btn) { btn.textContent = 'Send Request'; btn.disabled = false; }
      }, 320);
    }

    window.openQuoteModal = openModal;

    closeBtn.addEventListener('click', closeModal);

    var closeSuccess = success.querySelector('.raq-close-success');
    if (closeSuccess) closeSuccess.addEventListener('click', closeModal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('raq-open')) closeModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.raq-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      var data = new FormData(form);
      fetch('mail.php', { method: 'POST', body: data })
        .then(function (r) { return r.text(); })
        .then(function (res) {
          if (res.trim() === 'success') {
            form.style.display = 'none';
            success.style.display = 'flex';
          } else {
            btn.textContent = 'Try Again';
            btn.disabled = false;
          }
        })
        .catch(function () {
          btn.textContent = 'Try Again';
          btn.disabled = false;
        });
    });
  }

  function initQuoteModalTriggers() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      if (a.textContent.trim() === 'Request a Quote') {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.openQuoteModal === 'function') window.openQuoteModal();
      }
    }, true);
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    insertOverlay();
    buildMegaNav();
    buildQuoteModal();
    initQuoteModalTriggers();
    initScrollAnimations();
    initRipples();
    initNavbarScroll();
    initHeroParallax();
    bindPageTransitions();
    pageEntry();
  });

  // Handle bfcache restore (back/forward button)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      overlay = document.getElementById('page-transition-overlay');
      pageEntry();
    }
  });

})();
