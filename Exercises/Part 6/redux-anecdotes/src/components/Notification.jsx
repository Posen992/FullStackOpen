import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationVisible = useSelector(state => state.notification.isVisible)

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