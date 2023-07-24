import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, OutlinedInput, Select, InputLabel, FormControl, ListItemText, Checkbox} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchKey } from '../store/NotesReducer';


export default function FormDialog({ textHandler, saveHandler, cancelHandler, inputText, tagHandler, selectedTags, noteToEdit, onAddNew, hideFilter}) {
  const [open, setOpen] = React.useState(false);
  const [_selectedTags, setTags] = React.useState([]);
  const tags = useSelector(state => state.tags.tags);

  const [searchKey, setSearchKey] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTags(selectedTags);
  }, [selectedTags]);

  React.useEffect(() => {
    if (noteToEdit) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [noteToEdit]);

  const handleClickOpen = () => {
    onAddNew();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    cancelHandler();
  };

  const saveAndClose = () => {
    setOpen(false);
    saveHandler();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 490,
      },
    },
  };

  React.useEffect(() => {
   
    const instance = setTimeout(() => {
      dispatch(updateSearchKey({
        searchKey: searchKey
      }))
    }, 400);
    
    return(() => {
      clearTimeout(instance);
    })

  }, [searchKey]);

  return (
    <div className='add_note'>
      <div className='add_btn_wrapper'>
        { !hideFilter &&
                <TextField
                label="Filter"
                placeholder='Filter'
                variant="outlined"
                onChange={((e) => setSearchKey(e.target.value))}
                value={searchKey} />}
        <Button variant="contained"
                onClick={handleClickOpen}>
          Add Notes
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}
        PaperProps={{
          sx: {
            width: "550px",
            maxHeight: 410
          }
        }}>
        <DialogTitle className='dialog-title'>Add a Note</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="notes"
                label="Add your notes here..."
                type="text"
                multiline
                fullWidth
                rows={7}
                variant="standard"
                value={inputText}
                onChange={textHandler}
                InputProps={{
                  disableUnderline: true,
                }}
            />
            <FormControl className="select-dropdown"
                sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Select Tag</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={_selectedTags}
                onChange={tagHandler}
                input={<OutlinedInput label="Select Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {tags.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={_selectedTags.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveAndClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
