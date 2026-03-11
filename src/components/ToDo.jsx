// ---------------------------------------------------
// Material UI Components
// ---------------------------------------------------
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ---------------------------------------------------
// Icons
// ---------------------------------------------------
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
// ---------------------------------------------------
// Custom theme
// ---------------------------------------------------
import theme from '../assets/theme';

// =====================================================
// COMPONENT : ToDo
// Displays a single task card with action buttons
// =====================================================
export default function ToDo({ id,title, details, onAction, done }) {

  // ---------------------------------------------------
  // Shared style used by all action buttons
  // Keeps button design consistent
  // ---------------------------------------------------
  const buttonStyle = {
    borderRadius: '50%',      // circular button
    width: 48,
    height: 48,
    boxShadow: theme.shadows[3], // subtle shadow for depth
    transition: 'background-color 0.3s ease',
  };

  // ---------------------------------------------------
  //state for toast notification type (for future use with Snackbar)
  //const [toastType, setToastType] = React.useState("");

  return (

    <Card
      variant="outlined"
      sx={{
        height:'fit-content',
        borderRadius: '1rem',
        color: '#fff',
        background: done? theme.palette.success.light:'#000015',
      }}
    >

      <Box sx={{ p: 2 }}>

        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', gap: 5 }}
        >

          {/* -------------------------------
              Task Title + Details
          -------------------------------- */}
          <Stack direction="column">

            <Typography gutterBottom variant="h5">
              {title}
            </Typography>

            <Typography variant="body2">
              {details}
            </Typography>
            <Typography variant="body2">
              {done ? 'Status: Done' : 'Status: Pending'}
            </Typography>

          </Stack>


          {/* -------------------------------
              Task Action Buttons
          -------------------------------- */}
          <Stack direction="row" spacing={1}>

            {/* Mark Task as Done */}
            {!done && (<IconButton
              onClick={() => {
                onAction(id, 'done');}}
              aria-label="mark task as done"
              sx={{
                ...buttonStyle,
                bgcolor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                }
              }}
            >
              <CheckIcon fontSize="medium" />
            </IconButton>)}
            {done && (<IconButton
              onClick={() => {
                onAction(id, 'undo');}}
              aria-label="mark task as pending"
              sx={{
                ...buttonStyle,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.success.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                }
              }}
            >
              <RestoreIcon fontSize="medium" />
            </IconButton>)}


            {/* Edit Task */}
            <IconButton
              onClick={() =>{
                onAction(id, 'edit');
                }}
              aria-label="edit task"
              sx={{
                ...buttonStyle,
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.success.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.secondary.light,
                }
              }}
            >
              <EditIcon fontSize="medium" />
            </IconButton>


            {/* Delete Task */}
            <IconButton
              onClick={() =>{
                  onAction(id, 'delete');
                  
              }}
              aria-label="delete task"
              sx={{
                ...buttonStyle,
                bgcolor: theme.palette.error.main,
                color: theme.palette.success.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.error.light,
                }
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>

          </Stack>

        </Stack>

      </Box>

    </Card>

  );
}