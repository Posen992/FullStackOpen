import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'
import { likeWithId } from '../reducers/blogListReducer'
import { showErrorNotificaition } from '../reducers/notificationReducer'

import CommentList from './CommentList'
import { Button } from 'react-bootstrap'

const BlogDetail = () => {
  const blogId = useParams().blogId
  const blogs = useSelector((state) => state.blogList.blogs)
  const dispatch = useDispatch()

  if (!blogs || blogs.length === 0) {
    return null
  }

  const handleLike = async () => {
    const updatedBlog = { ...currentBlog, likes: currentBlog.likes + 1 }
    dispatch(likeWithId(updatedBlog.id))
    try {
      await blogService.updateBlog(updatedBlog.id.toString(), updatedBlog)
    } catch (exception) {
      dispatch(showErrorNotificaition(exception.response.data.error))
    }
  }

  const currentBlog = blogs.find((blog) => blog.id === blogId)

  return (
    <>
      <h2>blog app</h2>
      <h1>
        {currentBlog.title} {currentBlog.author}
      </h1>
      <a href={currentBlog.url}>{currentBlog.url}</a>
      <p>
        {currentBlog.likes} likes <Button size="sm" onClick={handleLike}> like </Button>
      </p>
      <p>added by {currentBlog.author}</p>

      <CommentList />
    </>
  )
}

export default BlogDetail
