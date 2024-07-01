import { createSlice } from '@reduxjs/toolkit'

const blogListSlice = createSlice({
  name: 'blogList',
  initialState: {
    blogs: [],
    groups: {},
  },
  reducers: {
    setBlogs: (state, action) => {
      return {
        ...state,
        blogs: action.payload.sort((item1, item2) => item2.likes - item1.likes),
      }
    },
    addBlog: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        blogs: state.blogs.concat(action.payload),
      }
    },
    removeBlogWithId: (state, action) => {
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      }
    },
    likeWithId: (state, action) => {
      const blogId = action.payload
      const blog = state.blogs.find((a) => a.id === blogId)
      const newBlog = { ...blog, likes: blog.likes + 1 }
      return {
        ...state,
        blogs: state.blogs
          .map((a) => (a.id === blogId ? newBlog : a))
          .sort((item1, item2) => item2.likes - item1.likes),
      }
    },
    groupBlogsByAuthor: (state, action) => {
      const copyBlogs = [...state.blogs]

      const groupedGroups = copyBlogs.reduce((groups, blog) => {
        const userId = blog.user.id
        if (!groups[userId]) {
          groups[userId] = {
            user: blog.user,
            blogs: [],
          }
        }
        groups[userId].blogs.push(blog)
        return groups
      }, {})
      console.log(groupedGroups)
      return {
        ...state,
        groups: groupedGroups,
      }
    },
  },
})

export const {
  setBlogs,
  addBlog,
  removeBlogWithId,
  likeWithId,
  groupBlogsByAuthor,
} = blogListSlice.actions
export default blogListSlice.reducer
