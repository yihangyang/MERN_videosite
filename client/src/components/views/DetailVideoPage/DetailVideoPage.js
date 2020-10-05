import { Avatar, List, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getVideo } from "../../../_actions/video_actions";
import { getComments } from "../../../_actions/comment_actions";

import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes'

function DetailVideoPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const videoId = props.match.params.videoId
  const [video, setVideo] = useState([])
  const [commentList, setCommentList] = useState([])

  const videoVariable =  {
    videoId
  }

  useEffect(() => {
    dispatch(getVideo(videoVariable))
      .then(res => {
        if (res.payload.success) {
          setVideo(res.payload.video)
        } else {
          alert('Failed to get video')
        }
      })
    dispatch(getComments(videoVariable))
      .then(res => {
        if (res.payload.success) {
          setCommentList(res.payload.comments)
        } else {
          alert('Failed to get video')
        }
      })
  }, [])

  const updateComment = (newComment) => {
    setCommentList(commentList.concat(newComment))
  }

  if (video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div>
            <div className="postPage" style={{ width: '100%', padding: '3rem 4rem'}}>
              <video style={{ width: '100%' }} src={`http://localhost:5000/${video.filepath}`} controls />
  
              <List.Item
                actions={[
                  <LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />,
                  <Subscribe userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={video.writer && video.writer.image} />}
                  title={<a href="">{video.title}</a>}
                  description={video.description}
                />
                <div></div>
              </List.Item>
              <Comments commentList={commentList} postId={video._id} refreshFunction={updateComment}/>
              
            </div>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default DetailVideoPage
