import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//Add Icon
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';



export default function AddTaskCard({addTask}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    addTask({
      title:formJson.title,
    details:formJson.details});
    event.target.reset(); // clears fields
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton
                    onClick={() => {
                        handleClickOpen();
                      console.log('Adding New Task.');}}
                    aria-label="add new task"
                    size="large"
                    sx={{ 
                        color: 'primary.main' ,
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                          },

                    }}
                  >
                    <AddIcon fontSize="medium" />
                  </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD A NEW TASK</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Task Title"
              type="title"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="details"
              name="details"
              label="Task details"
              type="details"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}