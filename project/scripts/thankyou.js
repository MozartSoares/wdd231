document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const userSubject = document.getElementById('user-subject');
  const userMessage = document.getElementById('user-message');
  const userNewsletter = document.getElementById('user-newsletter');

  if (params.size > 0) {
    userName.textContent = params.get('name') || 'Guest';
    userEmail.textContent = params.get('email') || 'Not provided';
    userSubject.textContent = params.get('subject') || 'No subject';
    userMessage.textContent = params.get('message') || 'No message';
    userNewsletter.textContent = params.get('newsletter') ? 'Subscribed' : 'Not subscribed';
  } else {
    document.querySelector('.submitted-data').innerHTML =
      '<p>No submission data found. Please submit the form first.</p>';
  }
});