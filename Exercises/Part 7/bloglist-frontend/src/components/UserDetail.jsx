import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const groups = useSelector((state) => state.blogList.groups)

  const userId = useParams().userId

  const userInfo = groups[userId]

  if (!groups || Object.keys(groups).length === 0 || !userInfo || !userId) {
    return null
  }

  return (
    <div>
      <h1>{userInfo.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}> {blog.title} </li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
