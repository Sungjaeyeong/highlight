const express = require('express');
const router = express.Router();

const { color, highlight, page, user } = require('../models');

router.get('/', (req, res) => {
  res.send('Hello World')
});

router.patch('/', (req, res) => {
  res.send('Hello World')
});