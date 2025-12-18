function login(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  localStorage.setItem('spendioUser', name);

  document.getElementById('welcome').innerText = `Hello, ${name}`;
  show('dashboard');
}

function logout() {
  localStorage.removeItem('spendioUser');
  show('auth');
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Auto login if user exists
const user = localStorage.getItem('spendioUser');
if (user) {
  document.getElementById('welcome').innerText = `Hello, ${user}`;
  show('dashboard');
}
