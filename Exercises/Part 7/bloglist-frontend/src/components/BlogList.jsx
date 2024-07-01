import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  showErrorNotificaition,
  showSuccessNotificaition,
} from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogListReducer'

import blogService from '../services/blogs'

import { Table } from 'react-bootstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Bloglists = () => {
  const blogList = useSelector((state) => state.blogList.blogs)
  const dispatch = useDispatch()

  //useRef
  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.createBlog(blogObject)
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      dispatch(
        showSuccessNotificaition(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
        ),
      )
    } catch (exception) {
      dispatch(showErrorNotificaition(exception.response.data.error))
    }
  }

  return (
    <>
      <h2>blog app</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogList.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Bloglists
