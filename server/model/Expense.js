const mongoose = require('mongoose')
const Expenses = require('../../expenses.json')
const moment = require('moment')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/ExpensesDb')
.then(()=> console.log('Connected to MongoDB'))
.catch((error)=> console.log('cant Connected to MongoDB',error));

moment().format('MMMM Do YYYY, h:mm:ss a');

const ExpenseSchema = new Schema({
    item : String,
    amount : Number,
    date : Date,
    group : String
})

const Expense = mongoose.model("Expense",ExpenseSchema)

module.exports = Expense


