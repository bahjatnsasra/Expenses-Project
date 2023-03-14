const express = require('express')
const Moment = require('moment')
const Expense = require('../model/Expense')
const router = express.Router()

function sortExpenses(expenses) {
    return expenses.sort((a,b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
}

router.get('/expenses',function (req,res) {
    let date1 = req.query.d1
    let date2 = req.query.d2
    
    if (date1 && date2) {
        let startDate = Moment(date1).format('YYYY-MM-DD')
        let endDate = Moment(date2).format('YYYY-MM-DD')
        Expense.find({date: {$gte: startDate , $lte:endDate}})
        .then(expenses => {
            res.send(sortExpenses(expenses))
        })

    }else if (date1 || date2) {
        let startDate = Moment(date1 || date2).format('YYYY-MM-DD')
        let endDate = Moment().format('YYYY-MM-DD')
        Expense.find({date: {$gte: startDate , $lte:endDate}})
        .then(expenses => {
            res.send(sortExpenses(expenses))
        })

    }else{
        Expense.find({}).then(expenses => {
            res.send(sortExpenses(expenses))
        })
    }
})

router.get('/expenses/:group',async function (req,res) {
    let group = req.params.group
    let total = req.query.total
    let amount = 0
    let expemsesByGroup = await Expense.find({
        group : group
    })
    if(total){
        expemsesByGroup.forEach(e => {
            amount += e.amount
        })
        res.send(`the spent on ${group} is ${amount}`)
    }else{
        res.send(expemsesByGroup)
    }
    
})


router.post('/expenses',function (req,res) {
    let newItem = req.body.item
    let newAmount = req.body.amount
    let newGroup = req.body.group
    let newDate = new Date()
    Moment(newDate).format('YYYY-MM-DD')

    let newExpense = new Expense({
        item: newItem,
        amount: newAmount,
        date:newDate,
        group: newGroup
    })

    newExpense.save().then(Expense => {
        res.send(`the amount you spent on ${Expense.item} is ${Expense.amount}$`);
    })
})


router.put('/update',async function (req,res) {
    let oldGroup = req.body.group1
    let newGroup = req.body.group2
    let updatedExpense = await Expense.findOneAndUpdate(
        {group : oldGroup},
        {group : newGroup},
        {new: true}
    )   

    res.send(`${updatedExpense.item}'s group have been changed to ${newGroup} `)
})


module.exports = router