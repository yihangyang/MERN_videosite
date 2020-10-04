const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//             Like Dislike
//=================================

router.get("/test", (req, res) => {
  res.status(200).json({ success: true, test: 'worked'})
})

router.post("/getLikes", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId }
  } else if (req.body.commentId) {
    variables = { commendtId: req.body.commentId }
  } else {
    res.status(200).json({ success: false })
  }

  Like.find(variables)
    .exec((err, likes) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, likes })
    })
})

router.post("/getDislikes", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId }
  } else  {
    variables = { commendtId: req.body.commentId }
  } 

  Dislike.find(variables)
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, dislikes })
    })
})

router.post("/like", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId, userId: req.body.userId }
  } else if (req.body.commentId) {
    variables = { commendtId: req.body.commentId, userId: req.body.userId }
  } else {
    res.status(200).json({ success: false})
  }

  // save like data in mongodb
  const like = new Like(variables)
  like.save((err, likeResult) => {
    if (err) return res.json({ sucess: false, err })
    // if dislike is clicked, then deactive the dislike button
    Dislike.findOneAndDelete(variables)
      .exec((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err})
        res.status(200).json({ success: true })
      })
  })

})

router.post("/unlike", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId, userId: req.body.userId }
  } else if (req.body.commentId) {
    variables = { commendtId: req.body.commentId, userId: req.body.userId }
  } else {
    res.status(200).json({ success: false})
  }

  // if dislike is clicked, then deactive the dislike button
  Like.findOneAndDelete(variables)
    .exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err})
      res.status(200).json({ success: true })
    })
})

router.post("/dislike", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId, userId: req.body.userId }
  } else if (req.body.commentId) {
    variables = { commendtId: req.body.commentId, userId: req.body.userId }
  } else {
    res.status(200).json({ success: false})
  }

  // save like data in mongodb
  const dislike = new Dislike(variables)
  dislike.save((err, dislikeResult) => {
    if (err) return res.json({ sucess: false, err })
    // if like is clicked, then deactive the like button
    Like.findOneAndDelete(variables)
      .exec((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err})
        res.status(200).json({ success: true })
      })
  })

})

router.post("/undislike", (req,res) => {
  let variables = {}
  if (req.body.videoId) {
    variables = { videoId: req.body.videoId, userId: req.body.userId }
  } else if (req.body.commentId) {
    variables = { commendtId: req.body.commentId, userId: req.body.userId }
  } else {
    res.status(200).json({ success: false})
  }

  // if dislike is clicked, then deactive the dislike button
  Dislike.findOneAndDelete(variables)
    .exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err})
      res.status(200).json({ success: true })
    })
})


module.exports = router;
