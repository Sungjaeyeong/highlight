const express = require('express');
const router = express.Router();

const { Highlight, Page } = require('../models');

// 1. 하이라이트 저장(Create)
router.post('/', async (req, res) => {
  if (!(req.body.userId && req.body.pageUrl && req.body.colorHex && req.body.colorNum && req.body.text)) {
    return res.status(422).json('Required parameters are insufficient');
  }
  const { userId, pageUrl, colorHex, colorNum, text } = req.body;
  let pageId;

  const isPage = await Page.findOne({
    where: { url: pageUrl }
  })
  if (isPage) {
    pageId = isPage.id;
  } else {
    const page = await Page.create({
      url: pageUrl
    });
    pageId = page.id;
  }

  const isHighlight = await Highlight.findOne({
    where: { 
      userId,
      pageId,
      payload: text
    }
  })

  if (isHighlight) {
    res.status(409).json('Data already exists.');
  } else {
    await Highlight.create({
      payload: text,
      colorHex,
      colorNum,
      pageId,
      userId
    })
    .then((highlight) => {
      res.status(201).json({
        highlightId: highlight.id,
        userId,
        pageId,
        colorHex,
        text,
      })
    })
    .catch(err => console.log(err))
  }

});

// 2. 하이라이트 수정(Update)
router.patch('/', async (req, res) => {
  if (!(req.body.userId && req.body.highlightId)) {
    return res.status(422).json('Required parameters are insufficient');
  }

  const { userId, highlightId } = req.body;
  let colorHex;
  let colorNum;
  let text;

  const highlight = await Highlight.findOne({
    where: { id: highlightId }
  })

  if (req.body.colorHex) {
    colorHex = req.body.colorHex;
    colorNum = req.body.colorNum;
  } else {
    colorHex = highlight.colorHex;
    colorNum = highlight.colorNum;
  }

  if (req.body.text) {
    text = req.body.text
  } else {
    text = highlight.payload;
  }

  if (highlight) {
    await Highlight.update({
      colorHex,
      colorNum,
      payload: text,
      updatedAt: new Date()
    },
    {
      where: { id: highlightId }
    })
    .then(() => res.status(200).json({
      highlightId,
      userId,
      pageId: highlight.pageId,
      colorHex,
      text
    }))
    .catch(err => console.log(err))
  } else {
    res.status(400).json('Bad request');
  }
});

// 3. 페이지 내 하이라이트 정보 가져오기(Read)
router.get('/', async (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json('Required parameters are insufficient');
  }
  let pageId;

  if (!req.body.pageId) {
    const page = await Page.findOne({
      where: {
        url: req.body.pageUrl
      }
    })
    pageId = page.id;
  } else {
    pageId = req.body.pageId;
  }

  await Highlight.findAll({
    where: {
      userId: req.body.userId,
      pageId,
    },
    order: [
      ['updatedAt', 'DESC'],
      ['createdAt', 'DESC']
    ]
  })
  .then((highlights) => res.status(200).json(highlights))
  .catch(err => console.log(err))
});

// 5. 하이라이트 삭제(Delete)
router.delete('/', async (req, res) => {
  if (!(req.body.userId && req.body.highlightId)) {
    return res.status(422).json('Required parameters are insufficient');
  }
  const { userId, highlightId } = req.body;

  const highlight = await Highlight.findOne({
    where: {
      id: highlightId,
      userId,
    }
  });
  if (highlight) {
    Highlight.destroy({
      where: {
        id: highlightId
      }
    })
    .then(res.status(404).json('OK'))
    .catch(err => console.log(err))
  } else {
    res.status(404).json('Not found')
  }
});

module.exports = router;