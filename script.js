// INIT DATA
let user = localStorage.getItem("user");
let balance = Number(localStorage.getItem("balance")) || 25000;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ELEMENTS
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const sendScreen = document.getElementById("sendScreen");
const receiveScreen = document.getElementById("receiveScreen");

// AUTO LOGIN
if (user) {
  showDashboard();
}

// LOGIN
function login() {
  const name = document.getElementById("usernameInput").value.trim();
  if (!name) return alert("Enter your name");

  localStorage.setItem("user", name);
  localStorage.setItem("balance", balance);
  user = name;
  showDashboard();
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// DASHBOARD
function showDashboard() {
  loginScreen.classList.add("hidden");
  sendScreen.classList.add("hidden");
  receiveScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  document.getElementById("welcomeText").innerText = `Hello, ${user}`;
  document.getElementById("balance").innerText = `₦${balance}`;
  renderTransactions();
}

// NAVIGATION
function openSend() {
  dashboard.classList.add("hidden");
  sendScreen.classList.remove("hidden");
}

function openReceive() {
  dashboard.classList.add("hidden");
  receiveScreen.classList.remove("hidden");
}

function goBack() {
  showDashboard();
}

// SEND MONEY
function sendMoney() {
  const amount = Number(document.getElementById("sendAmount").value);
  const recipient = document.getElementById("recipient").value.trim();

  if (!amount || !recipient) return alert("Fill all fields");
  if (amount > balance) return alert("Insufficient balance");

  balance -= amount;
  transactions.unshift(`➖ Sent ₦${amount} to ${recipient}`);

  saveAndReturn();
}

// RECEIVE MONEY
function receiveMoney() {
  const amount = Number(document.getElementById("receiveAmount").value);
  if (!amount) return alert("Enter amount");

  balance += amount;
  transactions.unshift(`➕ Received ₦${amount}`);

  saveAndReturn();
}

// SAVE
function saveAndReturn() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  showDashboard();
}

// TRANSACTIONS
function renderTransactions() {
  const list = document.getElementById("transactions");
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = "<li>No transactions yet</li>";
    return;
  }

  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    list.appendChild(li);
  });
}
