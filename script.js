// ---------- STATE ----------
let balance = Number(localStorage.getItem("balance")) || 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let savedUser = localStorage.getItem("username");

// ---------- SCREENS ----------
const screens = {
  login: document.getElementById("login"),
  dashboard: document.getElementById("dashboard"),
  send: document.getElementById("send"),
  receive: document.getElementById("receive")
};

function show(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[screen].classList.add("active");
}

// ---------- INIT ----------
if (savedUser) {
  document.getElementById("username").textContent = savedUser;
  show("dashboard");
  updateUI();
} else {
  show("login");
}

// ---------- AUTH ----------
function login() {
  const name = document.getElementById("usernameInput").value.trim();
  if (!name) return alert("Enter your name");

  localStorage.setItem("username", name);
  document.getElementById("username").textContent = name;
  show("dashboard");
}

function logout() {
  localStorage.clear();
  location.reload();
}

// ---------- NAV ----------
function showSend() {
  show("send");
}

function showReceive() {
  show("receive");
}

function goBack() {
  show("dashboard");
}

// ---------- TRANSACTIONS ----------
function sendMoney() {
  const amount = Number(document.getElementById("sendAmount").value);
  const recipient = document.getElementById("recipient").value.trim();

  if (!amount || amount <= 0) return alert("Invalid amount");
  if (amount > balance) return alert("Insufficient balance");
  if (!recipient) return alert("Enter recipient name");

  balance -= amount;
  transactions.unshift(`Sent ₦${amount} to ${recipient}`);

  save();
  updateUI();
  goBack();
}

function receiveMoney() {
  const amount = Number(document.getElementById("receiveAmount").value);

  if (!amount || amount <= 0) return alert("Invalid amount");

  balance += amount;
  transactions.unshift(`Received ₦${amount}`);

  save();
  updateUI();
  goBack();
}

// ---------- STORAGE ----------
function save() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ---------- UI ----------
function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);

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
