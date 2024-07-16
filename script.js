// Select elements from the DOM
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const expenseDescriptionInput = document.getElementById('expenseDescription');
const expenseAmountInput = document.getElementById('expenseAmount');
const totalExpensesText = document.getElementById('totalExpenses');

// Initialize expenses array
let expenses = [];

// Function to render expenses
function renderExpenses() {
  // Clear the existing list
  expenseList.innerHTML = '';
  
  // Render each expense
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `${expense.description} <span>$${expense.amount.toFixed(2)}</span> 
                             <button onclick="deleteExpense(${index})">Delete</button>`;
    expenseList.appendChild(expenseItem);
  });

  // Update total expenses
  updateTotalExpenses();
}

// Function to update total expenses
function updateTotalExpenses() {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  totalExpensesText.textContent = total.toFixed(2);
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateLocalStorage();
}

// Event listener for form submission
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get input values
  const expenseDescription = expenseDescriptionInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  
  // Validate input
  if (expenseDescription.trim() === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter valid expense description and amount.');
    return;
  }
  
  // Create expense object
  const expense = {
    description: expenseDescription,
    amount: expenseAmount
  };

  // Add expense to expenses array
  expenses.push(expense);
  // Render expenses
  renderExpenses();
  // Update local storage
  updateLocalStorage();
  // Clear input fields
  expenseDescriptionInput.value = '';
  expenseAmountInput.value = '';
});

// Function to update local storage
function updateLocalStorage() 
{
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to retrieve data from local storage on page load
function fetchFromLocalStorage() 
{
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  if (storedExpenses) {
    expenses = storedExpenses;
    renderExpenses();
  }
}
// Fetch data from local storage on initial load
fetchFromLocalStorage();