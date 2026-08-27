import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import appReducer from '../features/mainSlice/mainSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer
  }
})