const accountKey = 'karachiMartAccount';
const getAccount = () => JSON.parse(localStorage.getItem(accountKey) || 'null');
const setAccount = account => localStorage.setItem(accountKey, JSON.stringify(account));

const signupForm = document.getElementById('signup-form');
if (signupForm) signupForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const message = document.getElementById('signup-message');
  if (password !== confirm) { message.textContent = 'Passwords do not match.'; return; }
  setAccount({ name, email, password, createdAt: new Date().toLocaleDateString('en-PK') });
  localStorage.setItem('karachiMartLoggedIn', 'true');
  localStorage.setItem('karachiMartUser', name);
  localStorage.setItem('karachiMartEmail', email);
  window.location.href = 'index.html';
});

const loginForm = document.getElementById('login-form');
if (loginForm) loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const account = getAccount();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const message = document.getElementById('login-message');
  if (!account || account.email !== email || account.password !== password) { message.textContent = 'Email or password is incorrect.'; return; }
  localStorage.setItem('karachiMartUser', account.name);
  localStorage.setItem('karachiMartEmail', account.email);
  localStorage.setItem('karachiMartLoggedIn', 'true');
  window.location.href = 'index.html';
});