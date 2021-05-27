const express = require('express');
const cors = require('cors');
const app = express();

const highlightRouter = require('./routes/highlight');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cors());

app.use('/highlight', highlightRouter);
app.use('/user', userRouter);

app.use('/', (req, res) => {
  res.send('Hello World')
});

app.listen(3000, () => console.log('Server on 3000'));