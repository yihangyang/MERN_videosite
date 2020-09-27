import React, { useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux'

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label:'Private'},
  { value: 1, label:'Public'}
]

const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
]

function UploadVideoPage(props) {
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0)
  const [categories, setCategories] = useState("Film & Animation")
  const [filepath, setFilepath] = useState("")
  const [duration, setDuration] = useState("")
  const [thumbnail, setThumbnail] = useState("")


  const handleChangeTitle = ( event ) => {
    setTitle(event.currentTarget.value)
  }

  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value)
  }

  const handleChangePrivacy = (event) => {
    setPrivacy(event.currentTarget.value)
  }

  const handleChangeCategory = (event) => {
    setCategories(event.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (user.userData && !user.userData.isAuth) {
      alert("Please log in first")
    }

    if (title === "" || description === "" ||
        categories === "" || filepath === "" ||
        duration === "" || thumbnail === "") {
          return alert("Please fill all fields first")
        }

    const variables = {
      writer: user.userData._id,
      title: title,
      description: description,
      privacy: privacy,
      filepath: filepath,
      category: categories,
      duration: duration,
      thumbnail: thumbnail,
    }
    axios.post('/api/video/uploadVideo', variables)
      .then(res => {
        if(res.data.success) {
          alert("Video Uploaded Successfully")
          props.history.push('/')
        } else {
          alert('failed to upload video')
        }
      })
  }

  const onDrop = ( files ) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    axios.post('/api/video/uploadfiles', formData, config)
      .then(res => {
        if(res.data.success) {
          let variable = {
            filepath: res.data.filepath,
            filename: res.data.filename
          }
          setFilepath(res.data.filepath)

          // generate thumbnail with thid filepath
          axios.post('/api/video/thumbnail', variable)
            .then(res => {
              if(res.data.success) {
                setDuration(res.data.fileDuration)
                setThumbnail(res.data.thumbnailPath)
              } else {
                alert('failed to make the thumbnails')
              }
            })
        } else {
          alert("failed to save video in server")
        }
      })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                {...getRootProps()}
              >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />

              </div>
            )}
          </Dropzone>

        {thumbnail !== "" &&
            <div>
                <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
            </div>
        }
        </div>

        <br /><br />
        <label>Title</label>
        <Input
          onChange={handleChangeTitle}
          value={title}
        />
        <br /><br />
        <label>Description</label>
        <TextArea
          onChange={handleChangeDecsription}
          value={description}
        />
        <br /><br />

        <select onChange={handleChangePrivacy}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <select onChange={handleChangeCategory}>
          {Catogory.map((item, index) => (
              <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>

    </Form>
  </div>
  )
}

export default UploadVideoPage