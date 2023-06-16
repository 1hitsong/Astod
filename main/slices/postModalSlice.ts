import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../../renderer/store'

export interface PostModalState {
  isOpen: boolean
  inReplyTo: string | undefined
}

const initialState: PostModalState = {
  isOpen: false,
  inReplyTo: undefined
}

export const postModalSlice = createSlice({
  name: 'postmodal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openPostModal: (state, action: PayloadAction<string|undefined>) => {
      state.isOpen = true
      state.inReplyTo = action.payload
    },
    closePostModal: (state) => {
      state.isOpen = false
      state.inReplyTo = undefined
    },
  },
})

export const { openPostModal, closePostModal } = postModalSlice.actions

export const isModalOpen = (state: AppState) => state.postmodal.isOpen
export const getInReplyTo = (state: AppState) => state.postmodal.inReplyTo

export default postModalSlice.reducer
