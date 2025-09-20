/**
 * ===============================================
 * PHP EMAIL FORM VALIDATION - v3.9
 * ===============================================
 * 
 * Client-side validation for contact forms
 * Handles form submission, validation, and user feedback
 * 
 * Features:
 * - Real-time form validation
 * - AJAX form submission
 * - reCAPTCHA support
 * - User feedback messages
 * - Error handling
 * 
 * Author: BootstrapMade.com
 * URL: https://bootstrapmade.com/php-email-form/
 * ===============================================
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      const loading = thisForm.querySelector('.loading');
      const errorMsg = thisForm.querySelector('.error-message');
      const sentMsg = thisForm.querySelector('.sent-message');
      
      if (loading) loading.classList.add('d-block');
      if (errorMsg) errorMsg.classList.remove('d-block');
      if (sentMsg) sentMsg.classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      const loading = thisForm.querySelector('.loading');
      const sentMsg = thisForm.querySelector('.sent-message');
      
      if (loading) loading.classList.remove('d-block');
      if (data.trim() == 'OK') {
        if (sentMsg) sentMsg.classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    const loading = thisForm.querySelector('.loading');
    const errorMsg = thisForm.querySelector('.error-message');
    
    if (loading) loading.classList.remove('d-block');
    if (errorMsg) {
      errorMsg.innerHTML = error;
      errorMsg.classList.add('d-block');
    }
  }

})();
