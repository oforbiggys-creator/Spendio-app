function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Mock Register
function registerUser(e) {
  e.preventDefault();

  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;

  localStorage.setItem('spendioUser', JSON.stringify({ name, email }));

  alert('Account created successfully!');
  showScreen('login');
}

// Mock Login
function loginUser(e) {
  e.preventDefault();

  const storedUser = localStorage.getItem('spendioUser');

  if (!storedUser) {
    alert('No account found. Please register.');
    showScreen('register');
    return;
  }

  alert('Login successful!');
  // Next screen will be dashboard
}
