import { createSlice } from "@reduxjs/toolkit";

const notes = JSON.parse(localStorage.getItem("notes"));;

const initialState = {
    notes: notes && notes.length ? notes : [],
    filteredNotes: notes && notes.length ? notes : [],
    noteToEdit: null,
    searchKey: ''
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        saveNotes: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index === -1) {
                state.notes.push(action.payload);
            } else {
                state.notes[index] = {
                    ...action.payload
                }
            }
            state.filteredNotes = state.notes.filter(note => note.text.includes(state.searchKey) || note.tags.find(tag => tag.includes(state.searchKey)));
            localStorage.setItem('notes', JSON.stringify(state.notes));
        },
        deleteNotes: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload.id);
            state.filteredNotes = state.notes.filter(note => note.text.includes(state.searchKey) || note.tags.find(tag => tag.includes(state.searchKey)));
            localStorage.setItem('notes', JSON.stringify(state.notes));
        },
        updateNoteToEdit: (state, action) => {
            state.noteToEdit = action.payload;
        },
        discardNoteToEdit: (state) => {
            state.noteToEdit = null;
        },
        updateSearchKey: (state, action) => {
            state.searchKey = action.payload.searchKey;
            state.filteredNotes = state.notes.filter(note => note.text.includes(state.searchKey) || note.tags.find(tag => tag.includes(state.searchKey)));
        }
    }
});

export const { saveNotes, deleteNotes, updateNoteToEdit, discardNoteToEdit, updateSearchKey } = notesSlice.actions;

export default notesSlice.reducer;