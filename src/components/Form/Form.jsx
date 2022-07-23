import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux'

// GET THE CURRENT ID 

const Form = ({ id, setId }) => {

  const classes = useStyles();
  const dispatch = useDispatch()

  const post = useSelector((state) => id ? state.posts.find((post) => post._id === id) : null)


  const empty = {
    creator: '', 
    title: '', 
    message: '', 
    tags:  '', 
    selectedFile: ''
  }

  useEffect(() => {
      if(post) setPostData(post)
  }, [post])

  const [postData, setPostData] = useState({
    creator: '', 
    title: '', 
    message: '', 
    tags:  '', 
    selectedFile: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if(id){
      dispatch(updatePost(id, postData))
      clear()
    } else {
      dispatch(createPost(postData))
      clear()
    }
  }

  const clear = () => {
    setPostData(empty)
    setId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'tags'){
      setPostData({
        ...postData, [name]: value.split(', ')
      })
    } else {
      setPostData({
        ...postData, [name]: value
      })
    }
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{id ? 'Editing' : 'Creating'} a memory</Typography>
        <TextField name='creator' variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={handleChange}/>
        <TextField name='title' variant="outlined" label="Titlte" fullWidth value={postData.title} onChange={handleChange}/>
        <TextField name='message' variant="outlined" label="message" fullWidth value={postData.message} onChange={handleChange}/>
        <TextField name='tags' variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={handleChange}/>
        <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
        </div>
        <Button style={{ margin: '10px 0' }} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form