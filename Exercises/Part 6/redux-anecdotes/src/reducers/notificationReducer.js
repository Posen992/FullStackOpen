import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: 'There are no notifications',
  isVisible: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificaition: (state, action) => {
      return {
        ...state,
        message: action.payload,
        isVisible: true,
      };
    },
    hideNotificaition: (state, action) => {
      return {
        ...state,
        message: '',
        isVisible: false,
      };
    }
  }
})

export const { setNotificaition, hideNotificaition } = notificationSlice.actions
export default notificationSlice.reducer