import { useSelector } from 'react-redux'
import { hideNotificaition } from '../reducers/notificationReducer'
import store from '../store'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationVisible = useSelector(state => state.notification.isVisible)

  store.subscribe(() => {
    const isVisible = store.getState().notification.isVisible

    if (isVisible) {
      setTimeout(() => {
        store.dispatch(hideNotificaition())
      }, 5000)
    }
  })


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notificationVisible ? 'block' : 'none'
  }


  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification