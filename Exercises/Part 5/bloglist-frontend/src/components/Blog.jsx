import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [isShowDetail, setIsShowDetail] = useState(false)

  const detailVisible = { display: isShowDetail ? '' : 'none' }
  const removeVisible = { display: user.username  === blog.user.username ? '' : 'none' }

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
    <div style={detailVisible} className='blogDetail'>
      {blog.url}<br />
      likes {blog.likes}<button className='likeButton' onClick={handleLike}>like</button><br />
      {blog.user.name}<br />
      <button style={removeVisible} onClick={handleRemove}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle} data-testid='blog'>
      {blog.title} {blog.author}<button className='viewButton' onClick={() => { setIsShowDetail(!isShowDetail) }}>{isShowDetail ? 'hide' : 'view'}</button>
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