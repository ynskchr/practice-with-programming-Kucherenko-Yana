function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(email) {
  localStorage.setItem('currentUser', email);
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function showWidget() {
  const userEmail = getCurrentUser();
  const users = getUsers();
  const user = users.find(u => u.email === userEmail);
  const widget = document.getElementById('widget');
  if (user && widget) {
    widget.innerHTML = `👤 ${user.name}`;
  }
}

const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const users = getUsers();
    const form = e.target;
    const email = form.email.value;
    if (users.find(u => u.email === email)) {
      alert('Користувач з таким емейлом вже існує!');
      return;
    }
    users.push({
      name: form.name.value,
      email,
      phone: form.phone.value,
      password: form.password.value
    });
    saveUsers(users);
    alert('Успішна реєстрація!');
    location.href = 'index.html';
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const users = getUsers();
    const user = users.find(u => u.email === form.email.value && u.password === form.password.value);
    if (user) {
      setCurrentUser(user.email);
      alert('Вхід виконано!');
      location.href = 'settings.html';
    } else {
      alert('Невірний емейл або пароль!');
    }
  });
}

const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    alert('Спочатку увійдіть в акаунт!');
    location.href = 'index.html';
  }

  const users = getUsers();
  const index = users.findIndex(u => u.email === userEmail);
  const user = users[index];

  settingsForm.email.value = user.email;
  settingsForm.phone.value = user.phone;
  settingsForm.password.value = user.password;

  settingsForm.addEventListener('submit', e => {
    e.preventDefault();
    user.email = settingsForm.email.value;
    user.phone = settingsForm.phone.value;
    user.password = settingsForm.password.value;
    users[index] = user;
    saveUsers(users);
    setCurrentUser(user.email);
    alert('Дані оновлено!');
  });

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.href = 'index.html';
  });
}

showWidget();