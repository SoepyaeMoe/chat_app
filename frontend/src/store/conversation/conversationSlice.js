import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'selectedConversation',
    initialState: {
        selectedConversation: null,
        messages: []
    },
    reducers: {
        selected: (state, action) => {
            state.selectedConversation = action.payload;
        },
        setMessagesSlice: (state, action) => {
            state.messages = action.payload;
        }
    }
});

export const { selected, setMessagesSlice } = conversationSlice.actions;

export default conversationSlice.reducer;