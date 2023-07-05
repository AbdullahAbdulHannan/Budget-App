let displayAmount = document.getElementById('amount')
let displayAmount2 = document.getElementById('amount2')
let budgetValue = document.getElementById('budget')
let expenseTitle = document.getElementById('expenseTitle')
let productCost = document.getElementById('productCost')
let details = document.getElementById('detailContainer')
let ul = document.getElementById('ul')
let expenseTotal = 0;
let fg = document.getElementById('btn1')
fg.disabled = false
window.addEventListener('load', function () {
    if (localStorage.getItem('budgetValue')) {
        budgetValue.value = localStorage.getItem('budgetValue')
        displayAmount.innerHTML = `<span>${budgetValue.value}</span>`
    }
    if (localStorage.getItem('expenseTotal')) {
        expenseTotal = localStorage.getItem('expenseTotal')
        displayAmount2.innerHTML = `<span>${expenseTotal}</span><span>${parseInt(budgetValue.value) - expenseTotal}</span>`;
    }
    if (localStorage.getItem('expenseList')) {
        ul.innerHTML = localStorage.getItem('expenseList')
    }
})
function a() {
    displayAmount.innerHTML = `<span>${budgetValue.value}</span>`
    localStorage.setItem('budgetValue', budgetValue.value)
}
function b() {
    let expense = parseInt(productCost.value);
    if (expense>parseInt(budgetValue.value-expenseTotal)) {
        alert("Expense exceeds the budget!");
        return;
    }
    displayAmount2.innerHTML = `<span>${productCost.value}</span><span>${(budgetValue.value) - (productCost.value)}</span>`
    expenseTotal += expense;
    displayAmount2.innerHTML = `<span>${expenseTotal}</span><span>${parseInt(budgetValue.value) - expenseTotal}</span>`;
    ul.innerHTML += `<div class='dele'><li class='listStyle'><span style='color:blue;margin-top:90px;margin-left:10px'>${expenseTitle.value}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Rs ${expense}/-</span><span style='margin-left:200px;'><i class="fa-solid fa-sm fa-pen-to-square" style="color: #181ecd; " onclick='editExpense(this)'></i>
        <i class="fa-sharp fa-solid fa-trash" style="color:red;" onclick='deleteExpense()'></i></span></li><br></div>`;
    localStorage.setItem('expenseTotal', expense)
    localStorage.setItem('expenseList', ul.innerHTML)
    expenseTitle.value = '';
    productCost.value = '';
}
function editExpense(button) {
    let textToEdit = prompt('ENTER TEXT TO BE EDIT', button.parentNode.parentNode.firstChild.textContent);
    button.parentNode.parentNode.firstChild.textContent = textToEdit;
    localStorage.setItem('expenseList', ul.innerHTML)
}
function deleteExpense() {
    let clickedButton = event.target;
    if (clickedButton.classList.contains("fa-trash")) {
        let itemToDelete = clickedButton.parentNode.parentNode.parentNode;
        ul.removeChild(itemToDelete);
        localStorage.setItem('expenseList', ul.innerHTML);
        let expenseDeleteText = clickedButton.parentNode.parentNode.firstChild.textContent;
        console.log(expenseDeleteText);
        let expenseMatch = expenseDeleteText.match(/Rs (\d+)/);
        if (expenseMatch) {
            let deletedExpenseAmount = parseInt(expenseMatch[1]);
            //   console.log(expenseDelete);
            expenseTotal -= deletedExpenseAmount
            localStorage.setItem('expenseTotal', expenseTotal)
            displayAmount2.innerHTML = `<span>${expenseTotal}</span><span>${parseInt(budgetValue.value) - expenseTotal}</span>`;

            // Rest of the code to update expenseTotal and localStorage
        }
    }
}