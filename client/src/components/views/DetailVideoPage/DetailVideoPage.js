import { Avatar, List, Typography, Row, Col } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import SideVideo from './Sections/SideVideo'
function DetailVideoPage(props) {

  const videoId = props.match.params.videoId
  const [video, setVideo] = useState([])

  const videoVariable =  {
    videoId
  }

  useEffect(() => {
    axios.post('/api/video/getVideo', videoVariable)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.video)
          setVideo(res.data.video)
        } else {
          alert('Failed to get video')
        }
      })
  }, [])

  return (
    <Row>
      <Col lg={18} xs={24}>
        <div>
          <div className="postPage" style={{ width: '100%', padding: '3rem 4rem'}}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${video.filepath}`} controls />

            <List.Item
              actions={[]}
            >
              <List.Item.Meta
                avatar={<Avatar src={video.writer && video.writer.image} />}
                title={<a href="">{video.title}</a>}
                description={video.description}
              />
              <div></div>
            </List.Item>
          </div>
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  )
}

export default DetailVideoPage
