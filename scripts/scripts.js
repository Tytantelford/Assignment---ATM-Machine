class User {
  constructor(firstName, lastName, email, password, balance = 0.0) {
    this.firstName = firstName;
    this.lastName - lastName;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.transactions = [];
  }

  addTransaction(type, amount) {
    this.transactions.push({ type, amount });
    updateTransactionHistory(type, amount);
  }
}

const users = [
  new User("jack", "egbert", "j.com", "1234", 10000),
  new User("tytan", "telford", "t.com", "1234", 1000),
  new User("leland", "lobato", "l.com", "1234", 10000),
  new User("aidan", "jex", "j.com", "1234", 10000),
  new User("enoka", "enoka", "e.com", "1234", 10000),
];

let loggedInUser = null;

function toggleVisability(elementID, shouldShow) {
  document.getElementById(elementID).classList.toggle("hidden", !shouldShow); // .classList = access classList & toggle the hidden
}

function updateTextContent(elementID, text) {
  //helper function
  document.getElementById(elementID).textContent = text;
}

function showBalance() {
  //if users loged in
  if (loggedInUser) {
    updateTextContent(
      "balance-display",
      `Your balance is $${loggedInUser.balance.toFixed(2)}`
    );
  }
}

function toggleTransaction(type) {
  toggleVisability("deposit-section", type == "deposit");
  toggleVisability("withdraw-section", type == "withdraw");
}

function completeTransaction(type) {
  const amount = parseFloat(document.getElementById(`${type}-amount`).value);
  const errorId = `${type}-error`;
  const errorCondition =
    isNaN(amount) ||
    amount <= 0 ||
    (type == "withdraw" && amount > loggedInUser.balance);
  console.log("click");

  if (errorCondition) {
    toggleVisability(errorId, true);
  } else {
    loggedInUser.balance += type === "deposit" ? amount : -amount;
    loggedInUser.addTransaction(
      type === "deposit" ? "deposit" : "withdraw",
      amount
    );
    console.log(loggedInUser.transactions);
    showBalance();
    toggleVisability(`${type}-section`, false);
  }
}

function updateTransactionHistory(type, amount) {
  const transactionList = document.getElementById("transaction-list"); //get list and append list to each item we make
  const transactionItem = document.createElement("li");

  transactionItem.classList.add(type === "deposit" ? "deposit" : "withdraw"); //if not deposit then withdraw
  transactionItem.textContent = `${type}: $${amount.toFixed(2)}`;
  transactionList.appendChild(transactionItem);
}

function Login() {
  const email = document.getElementById("email").value; //pretty much saying to get the email we need to go to document then by the id and the id is email.. value is whatever you put in that input
  const password = document.getElementById("password").value;

  const user = users.find(
    (user) => user.email === email && user.password === password
  ); //this loops through const users

  if (user) {
    loggedInUser = user;
    toggleVisability("login-section", false); // false = dont want to see this
    toggleVisability("atm-menu", true);
    toggleVisability("transaction-history", true);
    showBalance();
  } else {
    toggleVisability("login-error", true);
  }
}

function logout() {
  ["atm-menu", "transaction-history"].forEach((id) => {
    toggleVisability(id, false);
  });
  document.getElementById("transaction-list").innerHTML = ""; //lowkey reseting it
  document.getElementById("email").value = ""; //set empty to reset it
  document.getElementById("password").value = "";
  loggedInUser = null;
  toggleVisability("login-section", true);
}
