import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { newNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(newNotification(notification))
    setTimeout(() => dispatch(removeNotification()),time*1000)
  }
}

export default notificationSlice.reducer