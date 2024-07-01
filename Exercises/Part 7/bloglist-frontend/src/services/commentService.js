import axios from 'axios'
const baseUrl = '/api/comment'

let token = null
let config = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`

  config = {
    headers: { Authorization: token },
  }
}

const getComments = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}`, config)
  return request.then((response) => {
    return response.data
  })
}

const createComment = (blogId, comment) => {
  const request = axios.post(`${baseUrl}/${blogId}`, comment, config)
  return request.then((response) => response.data)
}

export default { setToken, getComments, createComment }
