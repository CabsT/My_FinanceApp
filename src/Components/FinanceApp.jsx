import React, { useState, useEffect } from 'react';
import IncomeTable from './IncomeTable';
import ExpenseTable from './ExpenseTable';
import SummaryFinances from './SummaryFinance';

const FinanceApp = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [incomeMessage, setIncomeMessage] = useState('');
  const [expenseMessage, setExpenseMessage] = useState('');

  //Add animation class to the element and trigger the calculation of the remaining amount
  useEffect(() => {
    const heading = document.querySelector(".fade-in");
    heading.classList.add("animate");
    calculateRemainingAmount();
  }, [income, expense])


  // retrieves the value stored in the local storage with the key 'income' and assign it to the variable initialIncome
  // no value = initialise empty array and convert to string representation
  // if value exist the JSON.parse() converts the stored string back into an array and then assigns the parsed array to a setIncome() function. 
  useEffect(() => {
    const initialIncome = localStorage.getItem('income');
    if (!initialIncome) {
      localStorage.setItem('income', JSON.stringify([]));
    } else {
      setIncome(JSON.parse(initialIncome));
    }

  // retrieves the value stored in the local storage with the key 'expense' and assigns it to the variable initialExpense
  // no value = initialise empty array and convert to string representation
  // if value exist the JSON.parse() converts the stored string back into an array and then assigns the parsed array to a setExpense() function. 
    const initialExpense = localStorage.getItem('expense');
    if (!initialExpense) {
      localStorage.setItem('expense', JSON.stringify([]));
    } else {
      setExpense(JSON.parse(initialExpense));
    }
  }, []);

  // Add income to local storage
  const addIncome = () => {
    const description = prompt('Income Description:');
    const amountInput = parseFloat(prompt('Amount in Rand'));
    const amount = parseFloat(amountInput);

    if (!isNaN(amount)) {
      const newIncome = {
        id: Date.now(),
        description,
        amount,
      };

      const updatedIncome = [...income, newIncome];
      localStorage.setItem('income', JSON.stringify(updatedIncome));
      setIncome(updatedIncome);
      setIncomeMessage('Income added successfully!');

       // Clear the message after 3 seconds
    setTimeout(() => {
      setIncomeMessage('');
    }, 3000);

    } else {
      setIncomeMessage('Invalid amount. Please enter a valid number.');
    }
  };

  // Add expense to local storage
  const addExpense = () => {
    const description = prompt('Expense Description:');
    const amountInput = parseFloat(prompt('Amount in Rand:'));
    const amount = parseFloat(amountInput);

    if (!isNaN(amount)) {
      const newExpense = {
        id: Date.now(),
        description,
        amount,
      };

      const updatedExpense = [...expense, newExpense];
      localStorage.setItem('expense', JSON.stringify(updatedExpense));
      setExpense(updatedExpense);
      setExpenseMessage('Expense added successfully!');

    // Clear the message after 3 seconds
      setTimeout(() => {
        setExpenseMessage('');
      }, 3000);

    } else {
      setExpenseMessage('Invalid amount. Please enter a valid number.');
    }
  };

  //Create function to clear all data related to income and expense
  const removeIncome = (id) => {
    const updatedIncome = income.filter((income) => income.id !== id);
    localStorage.setItem('income', JSON.stringify(updatedIncome));
    setIncome(updatedIncome);
  };

  const removeExpense = (id) => {
    const updatedExpense = expense.filter((expense) => expense.id !== id);
    localStorage.setItem('expense', JSON.stringify(updatedExpense));
    setExpense(updatedExpense);
  };

  const clearData = () => {
    localStorage.removeItem('income');
    localStorage.removeItem('expense');
    setIncome([]);
    setExpense([]);
    setTotalIncome(0);
    setTotalExpense(0);
    setRemainingAmount(0);
  };



  // Calculate the remaining amount of money
  const calculateRemainingAmount = () => {
    const incomeTotal = income.reduce((total, income) => total + income.amount, 0);
    const expenseTotal = expense.reduce((total, expense) => total + expense.amount, 0);
    const remaining = incomeTotal - expenseTotal;

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
    setRemainingAmount(remaining);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className=" container flex items-center justify-center">
      <div>
        <div className='pb-12'>
          <h1 className=" text-6xl font-bold text-blue-700 fade-in">Income and Expense Tracker</h1>
        </div>
        <div className='pb-6'>
          <h2 className='font-bold text-4xl pb-2'>My Income:</h2>
          <button className="rounded-3xl border-solid border-black transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 duration-300 text-white font-bold py-2 px-4" onClick={addIncome}>Add Income</button>
          {incomeMessage && <p>{incomeMessage}</p>}
        </div>
        <div className='pb-6'>
          <h2 className='font-bold text-4xl pb-2'>My Expenses:</h2>
          <button className="rounded-3xl border-solid border-blacktransition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 duration-300  text-white font-bold py-2 px-4" onClick={addExpense}>
            Add Expense
          </button>
          {expenseMessage && <p>{expenseMessage}</p>}
        </div>
        <div>
          <h2 className='font-bold text-4xl pb-2'>Summary of Finances:</h2>
          <button className=" rounded-3xl border-solid border-black transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 duration-300 text-white font-bold py-2 px-4 " onClick={() => setShowPopup(true)}>
            Open
          </button>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="pb-6">
                <IncomeTable income={income} removeIncome={removeIncome} />
                  <ExpenseTable expense={expense} removeExpense={removeExpense} />
                  <SummaryFinances
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                    remainingAmount={remainingAmount}
                  />
                </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
           </div>
            <div className="py-6">
              <button
                className="rounded-3xl border-solid border-blacktransition ease-in-out delay-150 bg-red-700 hover:-translate-y-1 hover:scale-110 hover:bg-red-400 duration-300  text-white font-bold py-2 px-4"
                onClick={clearData} >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceApp;