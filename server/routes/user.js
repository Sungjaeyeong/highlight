const express = require('express');
const router = express.Router();

const { Color, Highlight, Page, User } = require('../models');

// 4. 유저가 하이라이트한 정보와 페이지 가져오기(Read)
router.get('/', async (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json('Required parameters are insufficient');
  }
  const highlight = await Highlight.findAll({
    where: {
      userId: req.body.userId
    }
  })
  const userPageId = highlight.map(el => (el.pageId));
  Page.findAll({
    where: {
      id: userPageId
    },
    attributes: [
      ['id', 'pageId'],
      ['url', 'pageUrl']
    ],
    include: [
      {
        model: Highlight,
        as: 'highlights',
        attributes: [
          ['id', 'highlightId'],
          'userId',
          'pageId',
          'colorHex',
          'colorNum',
          ['payload', 'text'],
        ],
      }
    ],
    order: [
      ['highlights', 'updatedAt', 'DESC'],
      ['highlights', 'createdAt', 'DESC'],
    ]
  })
  .then((userInfo) => res.json(userInfo))
});

// 6. 유저의 하이라이트 테마 변경(Update)
router.patch('/', async (req, res) => {
  if (!(req.body.userId && req.body.themeId)) {
    return res.status(422).json('Required parameters are insufficient');
  }
  const { userId, themeId } = req.body;

  const highlightInfo = await Highlight.findAll({
    where: {
      userId
    },
    attributes: ['id', 'colorNum']
  });
  highlightId = highlightInfo.map(el => el.id);
  highlightcolorNum = highlightInfo.map(el => el.colorNum);

  const getColor = async (el) => {
    return await Color.findOne({
      where: {
        theme: themeId,
        num: el
      },
      attributes: ['colorHex']
    })
  }

  const colorInfo = [];
  for (let el of highlightcolorNum) {
    colorInfo.push(await getColor(el));
  }

  newColorHex = colorInfo.map(el => el.colorHex);

  for (let i=0; i<highlightId.length; i++) {
    Highlight.update({
      colorHex: newColorHex[i]
    },
    {
      where: {
        id: highlightId[i]
      }
    })
  }
  User.update({
    theme: themeId
  },
  {
    where: {
      id: userId
    }
  })
  .then(res.status(200).json('OK'))
  .catch(err => console.log(err))
});

module.exports = router;