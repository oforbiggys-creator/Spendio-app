/* ===============================
   SPENDIO – FULL APP LOGIC
   =============================== */

/* ---------- STATE ---------- */
let userName = localStorage.getItem("spendio_name") || "";
let balance = Number(localStorage.getItem("spendio_balance")) || 0;
let transactions = JSON.parse(localStorage.getItem("spendio_tx")) || [];

/* ---------- ELEMENTS ---------- */
const nameInput = document.getElementById("nameInput");
const userDisplay = document.getElementById("userDisplay");
const balanceDisplay = document.getElementById("balance");
const transactionList = document.getElementById("transactions");

/* ---------- INIT ---------- */
window.onload = () => {
  if (userName) {
    nameInput.value = userName;
    userDisplay.textContent = userName;
  }

  showScreen("home");
  updateUI();
};

/* ---------- STORAGE ---------- */
function save() {
  localStorage.setItem("spendio_name", userName);
  localStorage.setItem("spendio_balance", balance);
  localStorage.setItem("spendio_tx", JSON.stringify(transactions));
}

/* ---------- SCREENS ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function goBack() {
  showScreen("home");
}

/* ---------- AUTH ---------- */
function continueApp() {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter your name");

  userName = name;
  userDisplay.textContent = name;

  save();
  showScreen("home");
}

function logout() {
  localStorage.clear();
  location.reload();
}

/* ---------- WALLET ---------- */
function sendMoney() {
  const amount = Number(document.getElementById("sendAmount").value);
  const recipient = document.getElementById("recipient").value.trim();

  if (!amount || amount <= 0) return alert("Invalid amount");
  if (!recipient) return alert("Enter recipient name");
  if (amount > balance) return alert("Insufficient balance");

  balance -= amount;

  transactions.unshift({
    type: "debit",
    title: `Sent to ${recipient}`,
    amount,
    time: new Date().toLocaleString()
  });

  save();
  updateUI();
  clearInputs();
  goBack();
}

function receiveMoney() {
  const amount = Number(document.getElementById("receiveAmount").value);

  if (!amount || amount <= 0) return alert("Invalid amount");

  balance += amount;

  transactions.unshift({
    type: "credit",
    title: "Wallet funding",
    amount,
    time: new Date().toLocaleString()
  });

  save();
  updateUI();
  clearInputs();
  goBack();
}

/* ---------- UI ---------- */
function updateUI() {
  balanceDisplay.textContent = balance.toFixed(2);

  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = "<li>No transactions yet</li>";
    return;
  }

  transactions.forEach(tx => {
    const isCredit = tx.type === "credit";

    const li = document.createElement("li");
    li.className = `tx ${isCredit ? "credit" : "debit"}`;

    li.innerHTML = `
      <div class="tx-left">
        <div class="tx-icon">
          ${isCredit ? "⬇" : "⬆"}
        </div>
        <div>
          <div class="tx-title">${tx.title}</div>
          <div class="tx-time">${tx.time}</div>
        </div>
      </div>
      <div class="tx-amount ${isCredit ? "credit" : "debit"}">
        ${isCredit ? "+" : "-"}₦${tx.amount}
      </div>
    `;

    transactionList.appendChild(li);
  });
}

/* ---------- HELPERS ---------- */
function clearInputs() {
  ["sendAmount", "recipient", "receiveAmount"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
    }
