import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: ['work', 'office', 'list', 'shopping', 'grocery', 'meeting', 'travel', 'health', 'cooking', 'others']
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
    }
});


export default tagsSlice.reducer;