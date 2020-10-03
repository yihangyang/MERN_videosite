const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================

router.get("/test", (req, res) => {
  res.status(200).json({ success: true, test: 'worked'})
})

// check the subscribeNumber we have
router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err)
      
      res.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
});

// check is already subscribed
router.post("/subscribed", (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo, 'userFrom':req.body.userFrom })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err)

      let result = false // userFrom is not subscriber of userTo
      if (subscribe.length !== 0) { // userFrom is subscriber of userTo
        result = true
      }
      
      res.status(200).json({ success: true, subscribed: result })
    })
});

// do the subscribe action
router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body)

  subscribe.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
});

// do the unsubscribe action
router.post("/unsubscribe", (req, res) => {
  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, doc})
    })
});


module.exports = router;
