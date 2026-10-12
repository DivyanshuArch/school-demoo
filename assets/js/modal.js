/**
 * Meridian Crest Academy - Modal & Interactive Dialog Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Toast notification manager
  window.showToast = function (message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.className = `transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${
      isSuccess
        ? 'bg-slate-900/95 text-white border-amber-500/40'
        : 'bg-red-950/95 text-white border-red-500/40'
    } backdrop-blur-md`;

    const iconHtml = isSuccess
      ? `<svg class="w-6 h-6 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      : `<svg class="w-6 h-6 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    toast.innerHTML = `
      ${iconHtml}
      <div class="text-sm font-medium leading-relaxed">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // Generic modal openers
  const inquiryModal = document.getElementById('inquiry-modal');
  const virtualTourModal = document.getElementById('tour-modal');

  // Trigger buttons
  document.querySelectorAll('[data-open-inquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (inquiryModal) openModal(inquiryModal);
    });
  });

  document.querySelectorAll('[data-open-tour]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (virtualTourModal) openModal(virtualTourModal);
    });
  });

  // Close triggers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close on outside click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle Inquiry Form Submission
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Disable and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Processing Inquiry...
      `;

      setTimeout(() => {
        const studentName = inquiryForm.querySelector('#studentName')?.value || 'Student';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        inquiryForm.reset();
        closeModal(inquiryModal);
        
        window.showToast(
          `Thank you! The Admissions Office has received your inquiry for <strong>${studentName}</strong>. Our admissions officer will contact you within 24 hours.`,
          'success'
        );
      }, 1200);
    });
  }

  // Prospectus quick download trigger
  document.querySelectorAll('[data-download-prospectus]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast(
        'Downloading the 2027–2028 Meridian Crest Academy Official Prospectus (PDF)...',
        'success'
      );
    });
  });

  // Newsletter subscribe
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        window.showToast(`Thank you! You have subscribed to the Meridian Crest Gazette with ${emailInput.value}.`, 'success');
        newsletterForm.reset();
      }
    });
  }
});
