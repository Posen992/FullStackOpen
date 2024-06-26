import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: 'There are no notifications',
  isVisible: false,
  duration: 0,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotificaition: (state, action) => {
      return {
        ...state,
        message: action.payload,
        isVisible: true,
      };
    },
    clearNotification: (state, action) => {
      return {
        ...state,
        message: '',
        isVisible: false,
      };
    }
  }
})

export const setNotificaition = (message, timeout) => {
  return async (dispatch) => {
    dispatch(showNotificaition(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000);
  }
}

export const { showNotificaition, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer