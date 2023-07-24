import { React, useState, useEffect } from "react";
import "../css/Notes.css";
import Note from "./Note"
import { v4 as uuid } from "uuid";
import FormDialog from './AddNotes';
import { useDispatch, useSelector } from 'react-redux';
import { saveNotes, deleteNotes, updateNoteToEdit, discardNoteToEdit } from "../store/NotesReducer";

function Notes() {

  const notes = useSelector((state) => state.notes.filteredNotes);
  const noteToEdit = useSelector(state => state.notes.noteToEdit);
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const tagHandler = (e) => {
    setTags(e.target.value);
  };

  const onAddNew = () => {
    setInputText('');
    setTags([]);
  };

  // add new note to the state array
  const saveHandler = () => {
    dispatch(saveNotes({
        id: noteToEdit ? noteToEdit.id : uuid(),
        text: inputText,
        tags: tags
    }));
    //clear the textarea
    setInputText('');
    setTags([]);
    dispatch(discardNoteToEdit());
  };

  const cancelHandler = () => {
    setInputText('');
    setTags([]);
    dispatch(discardNoteToEdit());
  };

  //delete note function
  const deleteNote = (id) => {
    dispatch(deleteNotes({
      id: id
    }))
  };

  useEffect(() => {
    if (noteToEdit) {
      setInputText(noteToEdit.text);
      setTags(noteToEdit.tags);
    }
  }, [noteToEdit]);

  const editNote = (note) => {
    dispatch(updateNoteToEdit(note));
  }

  return (
    <div className="notes">
      <div className={notes.length == 0 ? 'hidden' : undefined }>
        <FormDialog
          textHandler={textHandler}
          saveHandler={saveHandler}
          cancelHandler={cancelHandler}
          tagHandler={tagHandler}
          onAddNew={onAddNew}
          inputText={inputText}
          selectedTags={tags}
          noteToEdit={noteToEdit}
        />
      </div>
      <div className="note_section">
        <div className={notes.length != 0 ? 'hidden' : 'no-notes' }>
          <h3>No Notes Available. Please add notes to display</h3>    
          <FormDialog
            textHandler={textHandler}
            saveHandler={saveHandler}
            cancelHandler={cancelHandler}
            tagHandler={tagHandler}
            onAddNew={onAddNew}
            hideFilter={notes.length ===0 }
            inputText={inputText}
            selectedTags={tags}
            noteToEdit={noteToEdit}
          />
        </div>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            tags={note.tags}
            deleteNote={deleteNote}
            editNote={(() => editNote(note))}
          />
        ))}
      </div>
    </div>
  );
}

export default Notes;