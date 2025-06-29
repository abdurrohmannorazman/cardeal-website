document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const carModel = document.getElementById("carModel");
  const downPayment = document.getElementById("downPayment");
  const loanTerm = document.getElementById("loanTerm");
  const interestRate = document.getElementById("interestRate");
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Error messages
  const modelError = document.getElementById("modelError");
  const downError = document.getElementById("downError");
  const termError = document.getElementById("termError");
  const rateError = document.getElementById("rateError");

  // Result elements
  const modelResult = document.getElementById("modelResult");
  const priceResult = document.getElementById("priceResult");
  const downResult = document.getElementById("downResult");
  const loanResult = document.getElementById("loanResult");
  const termResult = document.getElementById("termResult");
  const rateResult = document.getElementById("rateResult");
  const paymentResult = document.getElementById("paymentResult");
  const interestResult = document.getElementById("interestResult");
  const totalResult = document.getElementById("totalResult");

  // Model names mapping
  const modelNames = {
    48500: "Myvi 1.3 G",
    50900: "Myvi 1.5 X",
    54900: "Myvi 1.5 H",
    59900: "Myvi 1.5 Advance",
    22000: "Axia 1.0 E",
    38600: "Axia 1.0 G",
    40000: "Axia 1.0 X",
    44000: "Axia 1.0 SE",
    49500: "Axia 1.0 Advance",
    62500: "Alza 1.5 X",
    68000: "Alza 1.5 H",
    75500: "Alza 1.5 Advance",
    67300: "Ativa 1.0 H",
    72600: "Ativa 1.0 Advance",
    72900: "Aruz 1.5 X",
    77900: "Aruz 1.5 Advance",
    36580: "Bezza 1.0 G",
    43980: "Bezza 1.3 X",
    49980: "Bezza 1.3 Advance",
  };

  // Initialize with zero values
  resetForm();

  // Event listeners
  calculateBtn.addEventListener("click", updateResults);
  resetBtn.addEventListener("click", resetForm);
  carModel.addEventListener("change", function () {
    hideError(modelError);
    updateResults();
  });
  downPayment.addEventListener("input", function () {
    hideError(downError);
    updateResults();
  });
  loanTerm.addEventListener("input", function () {
    hideError(termError);
    updateResults();
  });
  interestRate.addEventListener("input", function () {
    hideError(rateError);
    updateResults();
  });

  function hideError(errorElement) {
    errorElement.style.display = "none";
  }

  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function updateResults() {
    // Reset all errors
    hideError(modelError);
    hideError(downError);
    hideError(termError);
    hideError(rateError);

    // Get input values
    const price = parseFloat(carModel.value) || 0;
    const down = parseFloat(downPayment.value) || 0;
    const term = parseInt(loanTerm.value) || 0;
    const rate = parseFloat(interestRate.value) || 0;

    // Validate inputs
    let isValid = true;

    if (price === 0) {
      modelResult.textContent = "-- Select Model --";
      modelResult.className = "result-value placeholder";
      showError(modelError, "Please select a car model");
      isValid = false;
    } else {
      modelResult.textContent = modelNames[carModel.value] || "--";
      modelResult.className = "result-value";
    }

    if (down > price && price > 0) {
      showError(downError, "Down payment cannot exceed car price");
      isValid = false;
    }

    if (term > 0 && (term < 12 || term > 108)) {
      showError(termError, "Loan term must be between 12-108 months");
      isValid = false;
    }

    if (rate > 0 && (rate < 0.1 || rate > 20)) {
      showError(rateError, "Interest rate must be between 0.1-20%");
      isValid = false;
    }

    if (!isValid) {
      // If validation fails, set results to zero
      priceResult.textContent = "RM 0";
      downResult.textContent = "RM 0";
      loanResult.textContent = "RM 0";
      termResult.textContent = "0 months";
      rateResult.textContent = "0%";
      paymentResult.textContent = "RM 0.00";
      interestResult.textContent = "RM 0";
      totalResult.textContent = "RM 0";
      return;
    }

    // Calculate loan amount
    const loanAmount = Math.max(0, price - down);

    // Calculate monthly payment using flat interest method
    let totalInterest = 0;
    let totalPayment = loanAmount;
    let monthlyPayment = 0;

    if (term > 0 && rate > 0) {
      totalInterest = loanAmount * (rate / 100) * (term / 12);
      totalPayment = loanAmount + totalInterest;
      monthlyPayment = totalPayment / term;
    }

    // Update result fields
    priceResult.textContent = "RM " + formatNumber(price);
    downResult.textContent = "RM " + formatNumber(down);
    loanResult.textContent = "RM " + formatNumber(loanAmount);
    termResult.textContent = term + " months";
    rateResult.textContent = rate.toFixed(2) + "%";
    paymentResult.textContent = "RM " + monthlyPayment.toFixed(2);
    interestResult.textContent = "RM " + formatNumber(totalInterest.toFixed(2));
    totalResult.textContent = "RM " + formatNumber(totalPayment.toFixed(2));
  }

  function resetForm() {
    // Reset input fields to zero values
    carModel.selectedIndex = 0;
    downPayment.value = "0";
    loanTerm.value = "0";
    interestRate.value = "0";

    // Hide all errors
    hideError(modelError);
    hideError(downError);
    hideError(termError);
    hideError(rateError);

    // Reset results to zero values
    modelResult.textContent = "-- Select Model --";
    modelResult.className = "result-value placeholder";
    priceResult.textContent = "RM 0";
    downResult.textContent = "RM 0";
    loanResult.textContent = "RM 0";
    termResult.textContent = "0 months";
    rateResult.textContent = "0%";
    paymentResult.textContent = "RM 0.00";
    interestResult.textContent = "RM 0";
    totalResult.textContent = "RM 0";
  }

  function formatNumber(num) {
    // Format number with commas for thousands
    if (isNaN(num)) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});
