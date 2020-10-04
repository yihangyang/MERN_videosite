import { Icon, Tooltip } from 'antd'
import axios from 'axios'
import React , { useEffect, useState } from 'react'

function LikeDislikes(props) {

  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)
  const [likeAction, setLikeAction] = useState(null)
  const [dislikeAction, setDislikeAction] = useState(null)

  let variables = {}
  if(props.video) {
    variables = {
      videoId: props.videoId,
      userId: props.userId
    }
  } else {
    variables = {
      commentId: props.commentId,
      userId: props.userId
    }
  }
  
  useEffect(() => {
    axios.post('/api/like/getLikes', variables)
      .then(res => {
        if(res.data.success) {
          // count likes number
          setLike(res.data.likes.length)

          // wether i clicked like before
          res.data.likes.map(like => {
            if(like.userId === props.userId) {
              // already liked
              setLikeAction('liked')
            }
          })
        } else {
          alert('Failed to get likes')
        }
      })

    axios.post('/api/like/getDislikes', variables)
      .then(res => {
        if(res.data.success) {
          // count likes number
          setDislike(res.data.dislikes.length)

          // wether i clicked like before
          res.data.dislikes.map(dislike => {
            if(dislike.userId === props.userId) {
              // already liked
              setDislikeAction('disliked')
            }
          })
        } else {
          alert('Failed to get dislikes')
        }
      })
  }, [])

  const onLike = () => {
    if(likeAction === null) {
      axios.post('/api/like/like', variables)
        .then(res => {
          if(res.data.success) {
            setLike(like + 1)
            setLikeAction('liked')

            // dislike button deactive
            if (dislikeAction !== null) {
              setDislikeAction(null)
              setDislike(dislike - 1)
            }
          } else {
            alert('Failed to like')
          }
        })
    } else {
      axios.post('/api/like/unlike', variables)
        .then(res => {
          if(res.data.success) {
            setLike(like - 1)
            setLikeAction(null)
          } else {
            alert('Failed to unlike')
          }
        })
    }
  }

  const onDislike = () => {
    if(dislikeAction === null) {
      axios.post('/api/like/dislike', variables)
        .then(res => {
          if(res.data.success) {
            setDislike(dislike + 1)
            setDislikeAction('disliked')

            // like button deactive
            if (likeAction !== null) {
              setLikeAction(null)
              setLike(like - 1)
            }
            
          } else {
            alert('Failed to dislike')
          }
        })
    } else {
      axios.post('/api/like/unDislike', variables)
        .then(res => {
          if(res.data.success) {
            setDislike(dislike - 1)
            setDislikeAction(null)
          } else {
            alert('Failed to undislike')
          }
        })
    }
  }

  return (
    <React.Fragment>
      <span key="component-basic-like">
        <Tooltip title='Like'>
          <Icon type='like'
            theme={likeAction === 'liked' ? 'filled' : 'outlined' }
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto'}}>{like} UP</span>
      </span> &nbsp;&nbsp;
      <span key="component-basic-dislike">
        <Tooltip title='Dislike'>
          <Icon type='dislike'
            theme={dislikeAction === 'disliked' ? 'filled' : 'outlined' }
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto'}}>{dislike} DOWN</span>
      </span> &nbsp;&nbsp;
    </React.Fragment>
  )
}

export default LikeDislikes
