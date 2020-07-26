// add current date
let today = new Date();

  let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  document.querySelector('.budget-title').innerHTML = 'Balance on'+' '+ date;

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
    amt.appendChild(document.createTextNode(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));

    let del = document.createElement('button');
    del.appendChild(document.createTextNode('x'));

    del.addEventListener('click', (e) => {
        let currentBalance = document.querySelector('.budget-value');
        let income = document.querySelector('.budget-income-value').textContent.replace(/,/g, "");
        let expenses = document.querySelector('.budget-expenses-value').textContent.replace(/,/g, "");
        let parentDiv = e.target.closest('div');
        let choiceIncome = parentDiv.querySelector('.income-amount').textContent.replace(/,/g, "");
        parentDiv.parentNode.removeChild(parentDiv);
        let updatedIncome =  delfromIncomeList(income, choiceIncome);
        document.querySelector('.budget-income-value').textContent = updatedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        currentBalance.textContent = balance(updatedIncome, expenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    amt.appendChild(document.createTextNode(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));

    let del = document.createElement('button');
    del.appendChild(document.createTextNode('x'));

    del.addEventListener('click', (e) => {
        let currentBalance = document.querySelector('.budget-value');
        let income = document.querySelector('.budget-income-value').textContent.replace(/,/g, "");
        let expenses = document.querySelector('.budget-expenses-value').textContent.replace(/,/g, "");
        let parentDiv = e.target.closest('div');
        let choiceExpenses = parentDiv.querySelector('.expenses-amount').textContent.replace(/,/g, "");
        parentDiv.parentNode.removeChild(parentDiv);
        let updatedExpenses = delfromExpensesList(expenses, choiceExpenses);
        document.querySelector('.budget-expenses-value').textContent = updatedExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        currentBalance.textContent = balance(income, updatedExpenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    let income = document.querySelector('.budget-income-value').textContent.replace(/,/g, "");
    let expenses = document.querySelector('.budget-expenses-value').textContent.replace(/,/g, "");
    let operator = document.querySelector('.options');
    let description   = document.querySelector('.add-description').value;
    let incList = document.querySelector('#inc-items');
    let expList = document.querySelector('#exp-items');

    
    if (description.length <= 0) {
        
    } else if (amount <= 0){

    }else { 
        if (operator.value === 'inc') {
        let newIncome = add(income, amount);
        document.querySelector('.budget-income-value').textContent = newIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.querySelector('#add-form').reset();
 
        
        let incItem = addincomeItem(description, amount);
        incList.appendChild(incItem).style.borderBottom = '2px solid #ccc'; 
        
        currentBalance.textContent = balance(newIncome, expenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        let newExpense = minus(amount, expenses);
        document.querySelector('.budget-expenses-value').textContent = newExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.querySelector('#add-form').reset();
    
        
        let expItem = addexpensesItem(description, amount);
        expList.appendChild(expItem).style.borderBottom = '2px solid #ccc';
 
        currentBalance.textContent = balance(income, newExpense).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
     
    }
}



    
