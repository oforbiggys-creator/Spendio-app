let balance = 25000;
let transactions = [];

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

function login() {
  const name = document.getElementById("usernameInput").value.trim();
  if (!name) return alert("Enter your name");

  document.getElementById("username").textContent = name;
  show("dashboard");
}

function logout() {
  show("login");
}

function showSend() {
  show("send");
}

function showReceive() {
  show("receive");
}

function goBack() {
  show("dashboard");
}

function sendMoney() {
  const amount = Number(document.getElementById("sendAmount").value);
  const recipient = document.getElementById("recipient").value;

  if (!amount || amount <= 0 || amount > balance)
    return alert("Invalid amount");

  balance -= amount;
  transactions.unshift(`Sent ₦${amount} to ${recipient}`);
  updateUI();
  goBack();
}

function receiveMoney() {
  const amount = Number(document.getElementById("receiveAmount").value);

  if (!amount || amount <= 0)
    return alert("Invalid amount");

  balance += amount;
  transactions.unshift(`Received ₦${amount}`);
  updateUI();
  goBack();
}

function updateUI() {
  document.getElementById("balance").textContent = balance;

  const list = document.getElementById("transactions");
  list.innerHTML = "";
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    list.appendChild(li);
  });
}
