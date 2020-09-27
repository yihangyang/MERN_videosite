const express = require('express');
const router = express.Router();
const multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')

const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4' || ext !=='.flv') {
      return cb(res.status(400).end('only .mp4 and .flv file is allowed to upload'), false)
    }
    cb(null, true)
  }
})

var upload = multer({ storage: storage }).single('file')
//=================================
//             Video
//=================================


router.post("/uploadfiles", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filepath: res.req.file.path, filename: res.req.file.filename })
  })
});

router.post("/thumbnail", (req, res) => {

  let thumbnailPath = ""
  let fileDuration = ""

  ffmpeg.ffprobe(req.body.filepath, function(err,metadata) {
    // console.dir(metadata)
    // console.log(metadata.format.duration)

    fileDuration = metadata.format.duration
  })

  ffmpeg(req.body.filepath)
    .on('filenames', function(filenames) {
      console.log('Will generate ' + filenames.join(', '))
      thumbnailPath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function() {
      console.log('Screenshots taken')
      return res.json({ success: true, thumbnailPath, fileDuration })
    })
    .screenshots({
      // will take screens 33% 66% 99% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: "320x240",
      // %b: input basename, (filename w/o extension)
      filename: "thumbnail-%b.png"
    })
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body)

  video.save((err, video) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});

module.exports = router;
