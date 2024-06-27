import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        isVisible: true,
        message: action.payload,
      }
    case 'HIDE_NOTIFICATION':
      return {
        isVisible: false,
        message: '',
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useShowNotification = () => {

  const dispatch = useNotificationDispatch()

  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })

    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000);
  }
  return showNotification
}

export const useNotificaitonValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { isVisible: false, message: '' })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext