// Add income
function add(income, amount) {
    return Number(income) + Number(amount);
}

// Add expenses
function minus(expenses, amount) {
    return expenses = Number(expenses) + Number(amount);
}

// calculates balance
function balance(income, expenses) {
    return Number(income) - Number(expenses);
}

// delete from income list
function delfromIncomeList(totalIncome, choiceIncome) {
    return Number(totalIncome) - Number(choiceIncome);
}

// delete from list of expenses
function delfromExpensesList(totalExpenses, choiceExpenses) {
    return Number(totalExpenses) - Number(choiceExpenses);
}

// Add to income list & delete from same
function addincomeItem(description, amount) {
    let desc = document.createElement('span');
    desc.appendChild(document.createTextNode(description));

    let amt = document.createElement('span');
    amt.classList.add('income-amount');
    amt.appendChild(document.createTextNode(amount));

    let del = document.createElement('button');
    del.appendChild(document.createTextNode('x'));

    del.addEventListener('click', (e) => {
        let currentBalance = document.querySelector('.budget-value');
        let income = document.querySelector('.budget-income-value').textContent;
        let expenses = document.querySelector('.budget-expenses-value').textContent;
        let parentDiv = e.target.closest('div');
        let choiceIncome = parentDiv.querySelector('.income-amount').textContent;
        parentDiv.parentNode.removeChild(parentDiv);
        let updatedIncome =  delfromIncomeList(income, choiceIncome);
        document.querySelector('.budget-income-value').textContent = updatedIncome;

        currentBalance.textContent = balance(updatedIncome, expenses);
    });

    let div = document.createElement('div');
    div.classList.add('items-list');
    div.appendChild(desc);
    div.appendChild(amt);
    div.appendChild(del);
    return div;
}


// Add to the list of expenses and delete from same
function addexpensesItem(description, amount) {
    let desc = document.createElement('span');
    desc.appendChild(document.createTextNode(description));

    let amt = document.createElement('span');
    amt.classList.add('expenses-amount');
    amt.appendChild(document.createTextNode(amount));

    let del = document.createElement('button');
    del.appendChild(document.createTextNode('x'));

    del.addEventListener('click', (e) => {
        let currentBalance = document.querySelector('.budget-value');
        let income = document.querySelector('.budget-income-value').textContent;
        let expenses = document.querySelector('.budget-expenses-value').textContent;
        let parentDiv = e.target.closest('div');
        let choiceExpenses = parentDiv.querySelector('.expenses-amount').textContent;
        parentDiv.parentNode.removeChild(parentDiv);
        let updatedExpenses = delfromExpensesList(expenses, choiceExpenses);
        document.querySelector('.budget-expenses-value').textContent = updatedExpenses;
        currentBalance.textContent = balance(income, updatedExpenses);
    });

    let div = document.createElement('div');
    div.classList.add('items-list');
    div.appendChild(desc);
    div.appendChild(amt);
    div.appendChild(del);
    return div;
}


let form = document.querySelector('#add-form');

form.addEventListener('submit', onsubmit);

function onsubmit (e) {
    e.preventDefault();
    let amount = document.querySelector('.add-value').value;
    let currentBalance = document.querySelector('.budget-value');
    let income = document.querySelector('.budget-income-value').textContent;
    let expenses = document.querySelector('.budget-expenses-value').textContent;
    let operator = document.querySelector('.options');

    if (operator.value === '+') {
        let newIncome = add(income, amount);
        document.querySelector('.budget-income-value').textContent = newIncome;

        let incList = document.querySelector('#inc-items');
        let description   = document.querySelector('.add-description').value;
        let incItem = addincomeItem(description, amount);
        incList.appendChild(incItem).style.borderBottom = '1px solid #ccc'; 
        
        currentBalance.textContent = balance(newIncome, expenses)
    } else {
        let newExpense = minus(amount, expenses);
        document.querySelector('.budget-expenses-value').textContent = newExpense;
    
        let expList = document.querySelector('#exp-items');
        let description   = document.querySelector('.add-description').value;
        let expItem = addexpensesItem(description, amount);
        expList.appendChild(expItem).style.borderBottom = '1px solid #ccc';

        
        currentBalance.textContent = balance(income, newExpense)
    }
}

