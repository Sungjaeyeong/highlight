const express = require('express');
const router = express.Router();

const { Color, Highlight, Page, User } = require('../models');

// 4. 유저가 하이라이트한 정보와 페이지 가져오기(Read)
router.get('/', (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json('Required parameters are insufficient');
  }
});

// 6. 유저의 하이라이트 테마 변경(Update)
router.patch('/', (req, res) => {
  res.send('Hello World')
});

module.exports = router;