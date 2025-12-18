<script>
  let balance = parseFloat(localStorage.getItem("balance")) || 0;
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let storedPin = localStorage.getItem("pin");
  let pendingAction = null;

  function updateUI() {
    document.getElementById("balance").innerText = "₦" + balance.toFixed(2);
    const txDiv = document.getElementById("transactions");
    txDiv.innerHTML = "";

    if (transactions.length === 0) {
      txDiv.innerHTML = "<p>No transactions yet</p>";
      return;
    }

    transactions.slice().reverse().forEach(tx => {
      const div = document.createElement("div");
      div.className = "transaction";
      div.innerHTML = `
        <strong>${tx.type} ₦${tx.amount}</strong><br>
        <small>${tx.note}</small>
      `;
      txDiv.appendChild(div);
    });
  }

  function openSend() {
    requestPin(() => {
      document.getElementById("dashboard").classList.add("hidden");
      document.getElementById("sendScreen").classList.remove("hidden");
    });
  }

  function receiveMoney() {
    requestPin(() => {
      const amount = prompt("Enter amount to receive");
      if (!amount || amount <= 0) return;

      balance += parseFloat(amount);

      transactions.push({
        type: "Received",
        amount,
        note: "Wallet funding"
      });

      saveData();
      updateUI();
    });
  }

  function requestPin(action) {
    pendingAction = action;
    document.getElementById("pinInput").value = "";
    document.getElementById("pinMessage").innerText = "";
    document.getElementById("pinTitle").innerText =
      storedPin ? "Enter PIN" : "Create PIN";
    document.getElementById("pinModal").classList.remove("hidden");
  }

  function confirmPin() {
    const pin = document.getElementById("pinInput").value;
    const msg = document.getElementById("pinMessage");

    if (!/^\d{4}$/.test(pin)) {
      msg.innerText = "PIN must be 4 digits";
      msg.className = "error";
      return;
    }

    if (!storedPin) {
      localStorage.setItem("pin", pin);
      storedPin = pin;
      closePin(true);
      return;
    }

    if (pin !== storedPin) {
      msg.innerText = "Incorrect PIN";
      msg.className = "error";
      return;
    }

    closePin(true);
  }

  function closePin(success) {
    document.getElementById("pinModal").classList.add("hidden");
    if (success && pendingAction) pendingAction();
    pendingAction = null;
  }

  function goBack() {
    document.getElementById("sendScreen").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  }

  function sendMoney() {
    const amount = parseFloat(document.getElementById("sendAmount").value);
    const recipient = document.getElementById("recipient").value;
    const msg = document.getElementById("sendMessage");

    msg.innerText = "";

    if (!amount || amount <= 0 || !recipient) {
      msg.innerText = "Invalid input";
      msg.className = "error";
      return;
    }

    if (amount > balance) {
      msg.innerText = "Insufficient balance";
      msg.className = "error";
      return;
    }

    balance -= amount;

    transactions.push({
      type: "Sent",
      amount,
      note: "To " + recipient
    });

    saveData();
    updateUI();

    msg.innerText = "Transfer successful";
    msg.className = "success";

    document.getElementById("sendAmount").value = "";
    document.getElementById("recipient").value = "";
  }

  function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  function resetWallet() {
    if (!confirm("Logout and reset wallet?")) return;
    localStorage.clear();
    balance = 0;
    transactions = [];
    storedPin = null;
    updateUI();
  }

  updateUI();
</script>
