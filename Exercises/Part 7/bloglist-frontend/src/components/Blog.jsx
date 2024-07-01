

import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { showErrorNotificaition } from '../reducers/notificationReducer'
import { likeWithId, removeBlogWithId } from '../reducers/blogListReducer'

import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  // const [isShowDetail, setIsShowDetail] = useState(false)

  // const detailVisible = { display: isShowDetail ? '' : 'none' }
  // const removeVisible = {
  //   display: user.username === blog.user.username ? '' : 'none',
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // const handleLike = async () => {
  //   const updatedBlog = { ...blog, likes: blog.likes + 1 }
  //   dispatch(likeWithId(updatedBlog.id))
  //   try {
  //     await blogService.updateBlog(updatedBlog.id.toString(), updatedBlog)
  //   } catch (exception) {
  //     dispatch(showErrorNotificaition(exception.response.data.error))
  //   }
  // }

  const handleRemove = async () => {
    const removeConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    )
    if (removeConfirmed) {
      dispatch(removeBlogWithId(blog.id))
      try {
        await blogService.deleteBlog(blog.id.toString())
      } catch (exception) {
        dispatch(showErrorNotificaition(exception.response.data.error))
      }
    }
  }

  // const BlogDetail = () => (
  //   <div style={detailVisible} className="blogDetail">
  //     {blog.url}
  //     <br />
  //     likes {blog.likes}
  //     <button className="likeButton" onClick={handleLike}>
  //       like
  //     </button>
  //     <br />
  //     {blog.user.name}
  //     <br />
  //     <button style={removeVisible} onClick={handleRemove}>
  //       remove
  //     </button>
  //   </div>
  // )

  return (
    <div style={blogStyle} data-testid="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      {/* <button
        className="viewButton"
        onClick={() => {
          setIsShowDetail(!isShowDetail)
        }}
      >
        {isShowDetail ? 'hide' : 'view'}
      </button> */}
      {/* {BlogDetail()} */}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
