import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [isShowDetail, setIsShowDetail] = useState(false)

  const visible = { display: isShowDetail ? '' : 'none' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updateBlog(
      blog.id,
      {
        ttile: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1
      })
  }

  const handleRemove = () => {
    const removeConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (removeConfirmed) {
      removeBlog(blog.id)
    }
  }

  const BlogDetail = () => (
    <div style={visible}>
      {blog.url}<br />
      likes {blog.likes}<button onClick={handleLike}>like</button><br />
      {user.name}<br />
      <button onClick={handleRemove}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => { setIsShowDetail(!isShowDetail) }}>{isShowDetail ? 'hide' : 'view'}</button>
      {BlogDetail()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog