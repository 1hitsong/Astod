import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../../renderer/store'
import { 
  fetchNotificationsList, 
  postStatusMessage,
  boostStatusMessage
} from '../helpers/api/mastodonAPI'
import type NotificationsState from '../types/NotificationsState'
import type NotificationsContent from '../types/NotificationsContent'

const initialState: NotificationsState = {
  notificationsContent: []
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loadTimelineData(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getNotificationList = createAsyncThunk(
  'timeline/fetchNotificationsList',
  async () => {
    const response = await fetchNotificationsList()
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
)

export const postMessageAsync = createAsyncThunk(
  'timeline/postMessage',
  async (messageData: any) => {
    const response = await postStatusMessage(messageData)
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
)

export const boostMessageAsync = createAsyncThunk(
  'timeline/boostStatusMessage',
  async (messageID: any) => {
    const response = await boostStatusMessage(messageID)
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationList.fulfilled, (state, action: PayloadAction<NotificationsContent[]>) => {
          state.notificationsContent = action.payload;
      })
  },
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: AppState) => state.notifications

export default notificationsSlice.reducer