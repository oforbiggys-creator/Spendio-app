function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(screenId).classList.add('active');
}

// Loan application (mock logic)
document.getElementById('loanForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Loan application submitted. We will review it shortly.');
});
