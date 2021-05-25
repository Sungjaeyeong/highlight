const express = require('express')
const app = express()

app.use('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => console.log('Server on 3000'))