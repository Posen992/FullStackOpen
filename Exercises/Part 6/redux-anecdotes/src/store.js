import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer"

const initialStore = () => {
  return configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer,
    }
  })
}

const store = initialStore()

console.log(store.getState())

export default store

