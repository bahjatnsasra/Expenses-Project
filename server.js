const express = require('express')
const expensesApi = require('./server/routes/api')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/',expensesApi)

const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
