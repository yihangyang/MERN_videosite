import { Avatar, List, Typography, Row, Col } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comments from './Sections/Comments'

function DetailVideoPage(props) {

  const videoId = props.match.params.videoId
  const [video, setVideo] = useState([])
  const [commentList, setCommentList] = useState([])

  const videoVariable =  {
    videoId
  }

  useEffect(() => {
    axios.post('/api/video/getVideo', videoVariable)
      .then(res => {
        if (res.data.success) {
          setVideo(res.data.video)
        } else {
          alert('Failed to get video')
        }
      })
    
    axios.post('/api/comment/getComments', videoVariable)
      .then(res => {
        if (res.data.success) {
          setCommentList(res.data.comments)
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
                actions={[ <Subscribe userTo={video.writer._id} userFrom={localStorage.getItem('userId')} /> ]}
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
