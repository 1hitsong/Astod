import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import timelineReducer from '../main/slices/timelineSlice'
import repliesReducer from '../main/slices/repliesSlice'
import notificationsReducer from '../main/slices/notificationsSlice'
import clientappReducer from '../main/slices/clientappSlice'
import clientauthReducer from '../main/slices/clientauthSlice'
import postModalReducer from '../main/slices/postModalSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      timeline: timelineReducer,
      replies: repliesReducer,
      notifications: notificationsReducer,
      clientapp: clientappReducer,
      clientauth: clientauthReducer,
      postmodal: postModalReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
