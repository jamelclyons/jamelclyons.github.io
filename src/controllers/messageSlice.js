var _a;
import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    message: '',
    messageType: '',
    showStatusBar: false,
};
var messageSliceOptions = {
    name: 'message',
    initialState: initialState,
    reducers: {
        setMessage: function (state, action) {
            state.message = action.payload;
        },
        setMessageType: function (state, action) {
            state.messageType = action.payload;
        },
        setShowStatusBar: function (state, action) {
            state.showStatusBar = action.payload;
        },
    },
};
export var messageSlice = createSlice(messageSliceOptions);
export var setMessage = (_a = messageSlice.actions, _a.setMessage), setMessageType = _a.setMessageType, setShowStatusBar = _a.setShowStatusBar;
export default messageSlice;
