import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogListReducer from './reducers/blogListReducer'
import commentListReducer from './reducers/commentListReducer'

const initialStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer,
      blogList: blogListReducer,
      commentList: commentListReducer,
    },
  })
}

const store = initialStore()

console.log(store.getState())

export default store
