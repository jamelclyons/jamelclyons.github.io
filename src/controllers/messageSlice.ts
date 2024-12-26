import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';

interface MessageState {
  message: string;
  messageType: string;
  showStatusBar: false;
}

const initialState: MessageState = {
  message: '',
  messageType: '',
  showStatusBar: false,
};

const messageSliceOptions: CreateSliceOptions<MessageState> = {
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageType: (state, action) => {
      state.messageType = action.payload;
    },
    setShowStatusBar: (state, action) => {
      state.showStatusBar = action.payload;
    },
  },
};

export const messageSlice = createSlice(messageSliceOptions);

export const { setMessage, setMessageType, setShowStatusBar } =
  messageSlice.actions;

export default messageSlice;
