import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./NotesReducer";
import TagsReducer from "./TagsReducer";

const store = configureStore({
    reducer: {
        notes: notesSlice,
        tags: TagsReducer
    }
});

export default store;