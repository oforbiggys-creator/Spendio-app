let balance = 25000;
let transactions = [];

function login(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  localStorage.setItem('spendioUser', name);
  document.getElementById('welcome').innerText = `Hello, ${name}`;
  updateUI();
  show('dashboard');
}

function logout() {
  localStorage.clear();
  show('auth');
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function updateUI() {
  document.getElementById('balance').innerText = balance;
  const list = document.getElementById('transactions');
  list.innerHTML = '';
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.innerText = t;
    list.appendChild(li);
  });
}

function openSend() {
  show('send');
}

function openReceive() {
  show('receive');
}

function sendMoney() {
  const amount = Number(document.getElementById('sendAmount').value);
  if (!amount || amount > balance) {
    alert('Invalid amount');
    return;
  }
  balance -= amount;
  transactions.unshift(`Sent ₦${amount}`);
  updateUI();
  show('dashboard');
}

function receiveMoney() {
  const amount = Number(document.getElementById('receiveAmount').value);
  if (!amount) {
    alert('Invalid amount');
    return;
  }
  balance += amount;
  transactions.unshift(`Received ₦${amount}`);
  updateUI();
  show('dashboard');
}

// Auto login
const user = localStorage.getItem('spendioUser');
if (user) {
  document.getElementById('welcome').innerText = `Hello, ${user}`;
  show('dashboard');
  updateUI();
}
