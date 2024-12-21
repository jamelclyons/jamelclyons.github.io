import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    messageType: '',
    showStatusBar: ''
};

export const messageSlice = createSlice({
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
        }
    }
})

export const { setMessage, setMessageType, setShowStatusBar } = messageSlice.actions;

export default messageSlice;