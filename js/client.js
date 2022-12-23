/* Declare Variables for HTML Elments */
let balance = document.getElementById("balance");
let deposit_input = document.getElementById("deposit");
let withdraw_input = document.getElementById("withdraw");
const deposit_btn = document.getElementById("deposit_btn");
const withdraw_btn = document.getElementById("withdraw_btn");
const msg = document.getElementById("msg");
const deposite_msg = document.getElementById("deposite_msg");
const withdraw_msg = document.getElementById("withdraw_msg");

/* Redux Action Creators */
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSITE_MONEY = "DEPOSITE_MONEY";

const widthdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

const deposite = (amount) => {
  return {
    type: DEPOSITE_MONEY,
    payload: amount,
  };
};

/* Reducer (Operation Management) */
const operationReducer = (state = +balance.value, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return +balance.value - action.payload;
    case DEPOSITE_MONEY:
      return +balance.value + action.payload;
    default:
      return state;
  }
};

/* Create Redux Store */
const store = Redux.createStore(operationReducer);

/* make the store listene to any change in the UI */
store.subscribe(() => {
  console.log("BANK AMOUNT:", store.getState());
  balance.value = store.getState();
});

withdraw_btn.addEventListener("click", () => {
  /* regex Validation */
  let regex = /\d+/gi;

  if (!regex.test(balance.value)) {
    msg.innerText = "please add balance to make a WITHDRAW_MONEY";
  }
  if (+withdraw_input.value <= 0) {
    withdraw_msg.innerText = "add the amount u need to WITHDRAW";
  } else {
    store.dispatch(widthdraw(+withdraw_input.value));
    withdraw_msg.innerText = "";
  }

  /* Listener to the value if withdraw button was clicked */
  if (balance.value > 0) {
    balance.style.color = "#3fba84";
  } else if (balance.value < 0) {
    balance.style.color = "#ff5721";
  }
});

deposit_btn.addEventListener("click", () => {
  /* regex Validation */
  let regex = /\d+/gi;

  if (!regex.test(balance.value)) {
    msg.innerText =
      "please add balance to make a DEPOSITE_MONEY (shoud be positive)";
  }
  if (+deposit_input.value <= 0) {
    deposite_msg.innerText =
      "add the amount u need to DEPOSITE (shoud be positive)";
  } else {
    store.dispatch(deposite(+deposit_input.value));
    deposite_msg.innerText = "";
  }

  /* Listener to the value if deposit button was clicked */
  if (balance.value > 0) {
    balance.style.color = "#3fba84";
  } else if (balance.value < 0) {
    balance.style.color = "#ff5721";
  }
});

/* Balance UI styles */
balance.addEventListener("input", () => {
  if (balance.value > 0) {
    balance.style.color = "#3fba84";
    msg.innerText = "";
  } else if (balance.value < 0) {
    balance.style.color = "#ff5721";
    msg.innerText = "";
  } else {
    balance.style.color = "#484848";
  }
});
