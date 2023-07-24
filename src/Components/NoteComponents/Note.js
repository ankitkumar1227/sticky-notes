import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Chip } from "@mui/material";

function Note({ id, text, deleteNote, editNote, tags }) {
  
  return (
    <div className="note">
      <div className="note-sec">
      <div className="note__body" onClick={editNote}>
        {text}
      </div>
      <div className="note__footer">
        <div className="note__footer_section"
          onClick={editNote}>
            {
                tags.map(tag => 
                  <Chip className="chips" key={tag} label={tag} />
                )
            }
        </div>
        <DeleteForeverOutlinedIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></DeleteForeverOutlinedIcon>
      </div>
      </div>
    </div>
  );
}

export default Note;