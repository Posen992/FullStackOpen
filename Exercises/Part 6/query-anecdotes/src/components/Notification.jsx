import { useNotificaitonValue } from '../contexts/NotificaitionContext'

const Notification = () => {

  const notification = useNotificaitonValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification.isVisible ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
