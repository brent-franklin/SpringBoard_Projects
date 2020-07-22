
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  };

  return total;
};

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
};

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
};

function appendDeleteBtn (tr) {
  let newBtn = document.createElement('td');
  newBtn.innerText = 'X';

  newBtn.addEventListener('click', deleteLogic);
  
  tr.append(newBtn);
};

function deleteLogic (e) {

  //Remove server from 'allServers'
  let servName = document.querySelectorAll('#serverTable tbody tr');
  for(let i = 1; i <= servName.length; i++){
    if(allServers[`server${i}`].serverName === e.target.previousSibling.previousSibling.textContent){
      delete allServers[`server${i}`];
      serverId--;
    };
    
  };

  //Remove target
  e.target.parentElement.remove();

  //Grab elements to manipulate deletions and reinsertions 
  let bills = document.querySelectorAll('#paymentTable tbody tr td:nth-child(1)');
  let tips = document.querySelectorAll('#paymentTable tbody tr td:nth-child(2)');
  let billSummaryTotal = document.querySelector('#summaryTable tbody tr td:nth-child(1)');
  let tipSummaryTotal = document.querySelector('#summaryTable tbody tr td:nth-child(2)');
  let tipSumAv = document.querySelector('#summaryTable tbody tr td:nth-child(3)');
  let earnings = document.querySelectorAll('#serverTable tbody tr td:nth-child(2)');
  
  //variables to store new totals after deletion
  let billTotal = 0;
  let tipTotal = 0;
  
  // recalculate all bills in summary after removal
  for(let i of bills){
    let j = parseFloat(i.textContent.split("").slice(1).join(''));
    
    billTotal += j;
  };
  
  // recalculate all tips in summary after removal
  for(let i of tips){
    let j = parseFloat(i.textContent.split("").slice(1).join(''));
    
    tipTotal += j;
  };
  
  // recalculate all earnings on server table after removal
  for (let i of earnings) {
    i.textContent = `$${tipTotal/earnings.length}`;
  };

  //insert new totals into summary
  tipSumAv.innerText = `${Math.round(100 / (billTotal/tipTotal))}%`;
  billSummaryTotal.innerText = `$${billTotal}`;
  tipSummaryTotal.innerText = `$${tipTotal}`;
  
  //adjust allPayments object after removal
  allPayments = {payment1: {
    billAmt: billTotal,
    tipAmt: tipTotal,
    tipPercent: Math.round(100/(billTotal/tipTotal))
  }}
};
