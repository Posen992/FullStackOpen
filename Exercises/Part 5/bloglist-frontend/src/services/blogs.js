import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`

  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = blog => {
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const updateBlog = (blogId, blog) => {
  const request = axios.put(`${baseUrl}/${blogId}`, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }