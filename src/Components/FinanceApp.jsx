import React, { useState, useEffect } from 'react';
import IncomeTable from './IncomeTable';
import ExpenseTable from './ExpenseTable';
import SummaryFinance from './SummaryFinance'

const FinanceApp = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    calculateRemainingAmount();
  }, [income, expense]);

  // Create tables in local storage
  useEffect(() => {
    const initialIncome = localStorage.getItem('income');
    if (!initialIncome) {
      localStorage.setItem('income', JSON.stringify([]));
    } else {
      setIncome(JSON.parse(initialIncome));
    }

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
    console.log('Income added successfully!');
  } else {
    console.log('Invalid amount. Please enter a valid number.');
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
    console.log('Expense added successfully!');
  } else {
    console.log('Invalid amount. Please enter a valid number.');
  }
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

  return (
    <div className="bg-cover bg-background h-screen w-screen flex items-center justify-center">
    <div>
      <h1>Income and Expense Tracker</h1>
      <div>
        <h2>Add Income</h2>
        <button  className= "rounded-3xl border-solid border-black bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={addIncome}>Add Income</button>
      </div>
      <div>
        <h2>Add Expense</h2>
        <button  className= "rounded-3xl border-solid border-black bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={addExpense}>Add Expense</button>
      </div>
      <IncomeTable income={income} />
      <ExpenseTable expense={expense} />
      <SummaryFinance
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        remainingAmount={remainingAmount}
      />
    </div>
    </div>
  );
};

export default FinanceApp;