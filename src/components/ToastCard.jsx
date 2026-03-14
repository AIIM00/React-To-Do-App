import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ToastCard({ toastType, clearToast }) {
  //messages for different toast types
  const messages = {
  done: "Task marked as done",
  edit: "Task edited",
  delete: "Task deleted",
  undo: "Task marked as not done"
};

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (toastType !== "") {
      setOpen(true);
      
    }
  }, [toastType]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    clearToast(); // Clear the toast type in the parent component
  };

  const action = (
    <>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={messages[toastType]}
      action={action}
    />
  );
}