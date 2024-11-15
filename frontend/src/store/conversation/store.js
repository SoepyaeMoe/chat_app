import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';

export default configureStore({
    reducer: {
        conversation: conversationReducer
    }
});