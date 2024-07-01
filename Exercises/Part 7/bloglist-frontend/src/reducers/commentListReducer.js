import { createSlice } from '@reduxjs/toolkit'

const commentListlice = createSlice({
  name: 'commentList',
  initialState: [],
  reducers: {
    addComment: (state, action) => {
      return state.concat(action.payload)
    },
    setComments: (state, action) => {
      return action.payload
    },
  },
})

export const { addComment, setComments } = commentListlice.actions
export default commentListlice.reducer
