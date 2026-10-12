/**
 * Meridian Crest Academy - Main Application Script
 * Clean, lightweight, and responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawer.classList.add('translate-x-0');
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('hidden');
        requestAnimationFrame(() => mobileBackdrop.classList.remove('opacity-0'));
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('translate-x-full');
      mobileDrawer.classList.remove('translate-x-0');
      if (mobileBackdrop) {
        mobileBackdrop.classList.add('opacity-0');
        setTimeout(() => mobileBackdrop.classList.add('hidden'), 300);
      }
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Sticky Header Scroll Effect
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        mainHeader.classList.add('shadow-xl', 'bg-slate-950/95');
        mainHeader.classList.remove('bg-slate-950/85');
      } else {
        mainHeader.classList.remove('shadow-xl');
        mainHeader.classList.add('bg-slate-950/85');
      }
    });
  }

  // Animated Numbers Counter on Scroll
  const counters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentVal = target * easeOut;

      if (isDecimal) {
        element.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
      } else {
        element.textContent = `${prefix}${Math.floor(currentVal)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  if (counters.length > 0) {
    const statsSection = document.getElementById('stats-section') || counters[0].closest('section');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => countUp(counter));
          }
        });
      }, { threshold: 0.25 });
      observer.observe(statsSection);
    }
  }

  // Interactive Photo Gallery Filter
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      galleryFilterBtns.forEach(b => {
        b.classList.remove('bg-amber-400', 'text-navy-950', 'active');
        b.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
      });
      btn.classList.add('bg-amber-400', 'text-navy-950', 'active');
      btn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && item.getAttribute('data-category') !== btn.getAttribute('data-filter')) {
              item.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });

  // Lightbox Modal for Gallery Images
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) {
          lightboxCaption.textContent = img.getAttribute('alt') || 'Campus View';
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.closest('[data-close-lightbox]')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Day vs. Boarding Tuition Toggle
  const tuitionToggle = document.getElementById('tuition-type-toggle');
  if (tuitionToggle) {
    tuitionToggle.addEventListener('change', (e) => {
      const isBoarding = e.target.checked;
      const dayRates = document.querySelectorAll('.rate-day');
      const boardingRates = document.querySelectorAll('.rate-boarding');
      const toggleLabel = document.getElementById('tuition-type-label');

      if (isBoarding) {
        dayRates.forEach(el => el.classList.add('hidden'));
        boardingRates.forEach(el => el.classList.remove('hidden'));
        if (toggleLabel) toggleLabel.textContent = 'Showing: Residential Boarding (7-Day)';
      } else {
        dayRates.forEach(el => el.classList.remove('hidden'));
        boardingRates.forEach(el => el.classList.add('hidden'));
        if (toggleLabel) toggleLabel.textContent = 'Showing: Day Student Tuition';
      }
    });
  }

  // Accordion Component (FAQs)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('active');

      const container = item.closest('.accordion-group') || item.parentElement;
      container.querySelectorAll('.accordion-item').forEach(sibling => {
        sibling.classList.remove('active');
        const content = sibling.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Direct Contact / Inquiry Form Handler on page
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = contactForm.querySelector('input[name="name"]')?.value || 'Parent';
      if (window.showToast) {
        window.showToast(`Thank you, <strong>${parentName}</strong>! Your inquiry has been sent to our Admissions Office. We will reach out shortly.`, 'success');
      }
      contactForm.reset();
    });
  }
});
