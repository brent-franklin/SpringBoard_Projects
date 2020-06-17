window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const calc = {amount:10000, years:3, rate:7};
  const formAmount = document.getElementById('loan-amount');
  const formYears = document.getElementById('loan-years');
  const formRate = document.getElementById('loan-rate');
  formAmount.value = calc.amount;
  formYears.value = calc.years;
  formRate.value = calc.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const updatedPayments = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(updatedPayments));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const principle = values.amount;
  const monthlyRate = (values.rate/100) / 12;
  const payments = values.years * 12;
  return ((principle * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -payments))).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.getElementById('monthly-payment');
  monthlyPayment.innerText = '$' + monthly;
}
