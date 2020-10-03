import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

  const [childCommentNumber, setChildCommentNumber] = useState(0)
  const [openReplyComments, setOpenReplyComments] = useState(false)

  useEffect(() => {
    let commentNumber = 0
    props.commentList.map((comment, idx) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber ++
      }
    })
    setChildCommentNumber(commentNumber)
  }, [])

  let renderReplyComment = (parentCommentId) => (
    props.commentList && props.commentList.map((comment, idx) => (
       <React.Fragment key={idx}>
        { comment.responseTo === parentCommentId && (
          <div style={{ marginLeft: '50px', width: '80%' }}>
          {console.log(comment)}
            <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
            <ReplyComment commentList={props.commentList} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
          </div>
        )}
      </React.Fragment>
    ))
  )

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments)
  }
  
  return (
    <div>
      {childCommentNumber > 0 && (
        <a style={{fontSize: '14px', margin:0, color: 'gray'}} onClick={handleChange}>
          view more {childCommentNumber} comment(s)
        </a>
      )}
      { openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  )
}

export default ReplyComment
