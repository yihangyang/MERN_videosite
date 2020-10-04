import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Tooltip, Avatar, Button, Input } from 'antd'
import axios from 'axios'
import moment from 'moment'
import LikeDislikes from './LikeDislikes'
const { TextArea } = Input

function SingleComment(props) {
  const user = useSelector(state => state.user)

  const [commentValue, setCommentValue] = useState('')
  const [openReply, setOpenReply] = useState(false)

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  const toggleReply = (e) => {
    setOpenReply(!openReply)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: commentValue
    }
    axios.post('/api/comment/pushComment', variables)
      .then(res => {
        if (res.data.success) {
          setCommentValue('')
          toggleReply()
          props.refreshFunction(res.data.result)

        } else {
          alert('Failed to push comment')
        }
      })

  }


  const action = [
    <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
    <span onClick={toggleReply} key="comment-basic-reply-to">Reply to</span>
  ]
  return (
    <div>
      <Comment
        actions={action}
        author={<a>{props.comment.writer.name}</a>}
        avatar={
          <Avatar
            src={props.comment.writer.image}
            alt="image"
          />
        }
        content={
          <p>
            {props.comment.content}
          </p>
        }
        datetime={
          <Tooltip title={moment(props.comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(props.comment.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />

      {
        openReply && 
        (
          <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <TextArea
              style={{ width: '50%', borderRadius: '5px', height: '32px' }}
              onChange={handleChange}
              value={commentValue}
              placeholder="write some comments"
            />
            <br />
            <Button style={{ width: '20%', height: '32px' }} onClick={onSubmit}>Submit</Button>
          </form>
        )
      }
      
    </div>
  )
}

export default SingleComment
