import axios from 'axios'

const url = 'https://memories-project-231.herokuapp.com/posts'


export const fetchPosts = () => axios.get(url)

export const createPost = (newPost) => axios.post(url, newPost)

export const updatePost = (id, post) => axios.patch(url + '/' + id, post)

export const deletePost = (id) => axios.delete(url + '/' + id)

export const likePost = id => axios.patch(url + '/' + id + '/likePost')