import renderBase from "./base";
renderBase();
const form = document.getElementById('form');
const formStatus = document.getElementById('form-status');
const storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];

function FormData(name, email, subject, message) {
  this.name = name;
  this.email = email;
  this.subject = subject;
  this.message = message;
  this.timestamp = new Date().toISOString();
}

function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  input.classList.add('error');
}

function clearError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = '';
  input.classList.remove('error');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  Array.from(form.elements).forEach((element) => {
    if (element.required && !element.value.trim()) {
      showError(element, '* This field is required');
      isValid = false;
    } else if (element.type === 'email' && !isValidEmail(element.value)) {
      showError(element, 'Invalid email format');
      isValid = false;
    }
  });

  if (isValid) {
    const formData = new FormData(
      form.name.value,
      form.email.value,
      form.subject.value,
      form.message.value
    );

    storedData.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(storedData));

    form.submit();
  }
});

Array.from(form.elements).forEach(element => {
  element.addEventListener('input', () => {
    if (element.required && element.value.trim()) {
      clearError(element);
    }
  });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}