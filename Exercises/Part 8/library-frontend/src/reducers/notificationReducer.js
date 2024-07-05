import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },

    hideNotification: (state, action) => {
      return initialState
    },
  },
})

export const showErrorNotificaition = (message) => {

  return async (dispatch) => {
    dispatch(setNotification({ message, type: 'error' }))

    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export const showSuccessNotificaition = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type: 'success' }))

    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
