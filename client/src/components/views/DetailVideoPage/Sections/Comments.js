import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { pushComment } from '../../../../_actions/comment_actions'

import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
const { TextArea } = Input

function Comments(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const [comment, setComment] = useState('')

  const handleChange = (e) => {
    setComment( e.currentTarget.value )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      content: comment,
      writer: user.userData._id,
      postId: props.postId
    }

    dispatch(pushComment(variables))
      .then(res => {
        if(res.payload.success) {
          setComment('')
          props.refreshFunction(res.payload.result)
        } else {
          alert('Failed to push comment')
        }
      })
  }
  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />
      {/* Comment Lists */}
      {props.commentList && props.commentList.map((comment, idx) => (
        (!comment.responseTo && 
          <React.Fragment key={idx}>
            <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
            <ReplyComment commentList={props.commentList} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
          </React.Fragment>
        )
        
      ))}

      {/* Root Comment Form */}
      { (user.userData && !user.userData.isAuth) ? (
        <div>Wanna say something? <a href='/login'>login</a> or <a href='/register'>register</a></div>
      ) : (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius:'5px'}}
            onChange={handleChange}
            value={comment}
            placeholder='write sth...'
          />
          <br />
          <Button style={{ width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>

        </form>
      )}
      
    </div>
  )
}

export default Comments