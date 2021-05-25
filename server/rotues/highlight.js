const express = require('express');
const router = express.Router();

const { color, highlight, page, user } = require('../models');

router.post('/', (req, res) => {
  res.send('Hello World')
});

router.patch('/', (req, res) => {
  res.send('Hello World')
});

router.get('/', (req, res) => {
  res.send('Hello World')
});

router.delete('/', (req, res) => {
  res.send('Hello World')
});