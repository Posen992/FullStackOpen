import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const initialStore = () => {
	return configureStore({
		reducer: {
			notification: notificationReducer,
			user: userReducer,
		},
	})
}

const store = initialStore()

console.log(store.getState())

export default store
