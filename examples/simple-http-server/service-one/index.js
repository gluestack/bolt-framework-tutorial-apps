
const express = require('express')
const app = express()
const dotenv = require("dotenv")
const port = process.env.ASSIGNED_PORT || 9000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})