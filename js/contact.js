/* ==========================================================================
   CONTACT FORM & EMAILJS INTEGRATION // CLOUD COMMUNICATIONS
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = document.getElementById('send-btn');
      const originalText = btn ? btn.innerHTML : 'Send Message';

      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Signal...';
        btn.disabled = true;
      }

      // Check if EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        showToastAlert('⚠️ Email service initializing... Please try again or email gaurav25eng@gmail.com directly.');
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
        return;
      }

      emailjs
        .sendForm('service_shg8rpt', 'template_hca8c7d', this)
        .then(() => {
          showToastAlert('🚀 Message transmitted successfully! Gaurav will get back to you promptly.');
          form.reset();
          if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Signal Sent!';
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.disabled = false;
            }, 3000);
          }
        })
        .catch((error) => {
          console.error('Email transmission error:', error);
          showToastAlert('❌ Transmission failed. Please contact gaurav25eng@gmail.com directly.');
          if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }
        });
    });
  });

  // Global Toast function
  window.showToastAlert = function (message) {
    let toast = document.querySelector('.cyber-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cyber-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-satellite-dish" style="color:var(--cyber-cyan);"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };
})();