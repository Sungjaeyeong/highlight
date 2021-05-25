const express = require('express');
const app = express();

const highlightRouter = require('./routes/highlight');
const userRouter = require('./routes/user');

app.use('/', (req, res) => {
  res.send('Hello World')
});

app.use('/highlight', highlightRouter);
app.use('/user', userRouter);

app.listen(3000, () => console.log('Server on 3000'));