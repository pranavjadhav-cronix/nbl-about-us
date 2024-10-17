document.addEventListener('DOMContentLoaded', () => {
  const emailButton = document.querySelector('.nobull-footer .button-email');
  const smsButton = document.querySelector('.nobull-footer .button-sms');
  const emailInput = document.querySelector(
    '.nobull-footer input[type="email"]',
  );
  const phoneInput = document.querySelector('.nobull-footer input[type="tel"]');
  const emailErrorMessage = document.querySelector(
    '.nobull-footer .error-message-email',
  );
  const smsErrorMessage = document.querySelector(
    '.nobull-footer .error-message-sms',
  );
  const form = document.querySelector('.nobull-footer #footer-newsletter');

  function toggleActiveButton(clickedButton, otherButton) {
    clickedButton.classList.add('button--active');
    otherButton.classList.remove('button--active');
  }

  function toggleInputs(showEmail) {
    if (showEmail) {
      emailInput.classList.remove('hidden');
      phoneInput.classList.add('hidden');
      smsErrorMessage.classList.add('hidden');
    } else {
      emailInput.classList.add('hidden');
      phoneInput.classList.remove('hidden');
      emailErrorMessage.classList.add('hidden');
    }
  }

  function validateInput(input, errorMessage) {
    console.log('CHECK VALIDATY');
    console.log(input.checkValidity());
    if (!input.checkValidity()) {
      errorMessage.classList.remove('hidden');
      return false;
    } else {
      errorMessage.classList.add('hidden');
      return true;
    }
  }

  emailButton.addEventListener('click', () => {
    toggleActiveButton(emailButton, smsButton);
    toggleInputs(true);
  });

  smsButton.addEventListener('click', () => {
    toggleActiveButton(smsButton, emailButton);
    toggleInputs(false);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isEmailVisible = !emailInput.classList.contains('hidden');

    let isValid = true;

    if (isEmailVisible) {
      isValid = validateInput(emailInput, emailErrorMessage);
    } else {
      isValid = validateInput(phoneInput, smsErrorMessage);
    }

    console.log('IS VALID', isValid);
    console.log(phoneInput);
    console.log(smsErrorMessage);

    if (isValid) {
      event.target.submit();
    }
  });
});
