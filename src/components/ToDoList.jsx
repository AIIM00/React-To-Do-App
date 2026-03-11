// -----------------------------
// Imports
// -----------------------------
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Header from './Header';
import ToDo from './ToDo';
import ToastCard from './ToastCard';

import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect} from 'react';
import { TaskContext } from "../contexts/TaskContext";

import theme from '../assets/theme';
// =====================================================
// MAIN COMPONENT : ToDoList
// Holds the tasks state and handles task actions
// =====================================================
export default function ToDoList() {

  // ---------------------------------------------------
  // State: list of tasks
  // Each task contains id, title, details, and status
  // ---------------------------------------------------
  const [taskArr, setTasks] = useState(()=>{
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    return storageTodos || [
     {
    id: uuidv4(),
    title: "Finish React To-Do App",
    details: "Complete filtering, editing, and UI improvements",
    done: false
  },
  {
    id: uuidv4(),
    title: "Go to the Gym",
    details: "Leg day workout and 20 minutes cardio",
    done: true
  },
  {
    id: uuidv4(),
    title: "Study Networking",
    details: "Review CCNA routing and NAT configuration",
    done: false
  },
  {
    id: uuidv4(),
    title: "Push Project to GitHub",
    details: "Update README and commit the latest changes",
    done: true
  },
  {
    id: uuidv4(),
    title: "Buy Groceries",
    details: "Milk, eggs, chicken, and vegetables",
    done: false
  }

]});
useEffect(()=>{
  localStorage.setItem('todos', JSON.stringify(taskArr));
},[taskArr])

  // ---------------------------------------------------
  // State: input value for new task
  // ---------------------------------------------------
  const [newTask, setNewTask] = useState({
      title: '',
      details: '',
  });


  // ---------------------------------------------------
  // State: type of toast notification to show (for future use with Snackbar)
  const [toastType, setToastType] = useState("");

  // ---------------------------------------------------
  // State: stores which tasks to show
  const [filter, setFilter] = useState("all");

  // ---------------------------------------------------
  const filteredTasks = taskArr.filter(task => {
  if (filter === "done") return task.done;
  if (filter === "undone") return !task.done;
  return true; // all
});

// ---------------------------------------------------


  // ---------------------------------------------------
  // Handles task button actions (done / edit / delete)
  // Passed down to each ToDo component
  // ---------------------------------------------------
  const handleTaskAction = (id, action) => {
    switch (action) {

      case 'done':
        setToastType(action);
        setTasks(taskArr.map(task =>
          task.id === id ? { ...task, done: true } : task

        ));
        
        break;
      case 'undo':
        setToastType(action);
        setTasks(taskArr.map(task =>
          task.id === id ? { ...task, done: false } : task))
        break;
      case 'edit':
        setToastType(action);
        setTasks(taskArr.map(task =>
          task.id === id? { ...task, title: prompt('Enter New Title', task.title)} : task
        ));
        break;
      
      case 'delete':{
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;
        else{
          setToastType(action);
          setTasks(taskArr.filter(task => task.id !== id));
        }
         break;
      }
       

      default:
        break;
    }
  };


  // ---------------------------------------------------
  // Adds a new task to the task list
  // Prevents adding empty tasks
  // ---------------------------------------------------
  function addTask() {
    

    if (!newTask.title.trim()) return;
    const newToDo = {
        id: uuidv4(),
        title: newTask.title,
        details: newTask.details,
        done: false,
      }
    const updatedToDo = [
      ...taskArr,newToDo
      ,
    ] 
    setTasks(updatedToDo);

    // clear input field after adding task
    setNewTask({title:'', details:''});
  }


  // ---------------------------------------------------
  // Create ToDo components from the task array
  // ---------------------------------------------------
  const taskCard = filteredTasks.map((task) => (
    <ToDo
      key={task.id}
      id={task.id}
      title={task.title}
      details={task.details}
      done={task.done}
      onAction={handleTaskAction}
    />
  ));


  // ---------------------------------------------------
  // Component UI
  // ---------------------------------------------------
  return (
    <TaskContext.Provider value={{taskArr, filter,setFilter}}>
      <Container 
      style={{
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        borderRadius: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        
      }}
      >
        {/* Page Header */}
        <Header />
        {/* Render all task cards */}
        <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:'0.5rem',
        }}>
          {taskCard}
        </Box>
        
        {/* Add Task Section */}
        <AddTask 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
        <ToastCard toastType={toastType} clearToast={() => setToastType('')}/>
      </Container>
    </TaskContext.Provider>

  );
  
}



// =====================================================
// COMPONENT : AddTask
// Responsible only for adding new tasks
// =====================================================
export function AddTask({ newTask, setNewTask, addTask }) {


  // ---------------------------------------------------
  // Custom styling for the TextField
  // ---------------------------------------------------
  const textStyle = {
    '& .MuiOutlinedInput-root': {

      '& fieldset': {
        borderRadius: '1rem',
        borderWidth: '0.1rem',
        borderColor: 'grey.500',
      },

      '&:hover fieldset': {
        borderWidth: '0.15rem',
        borderColor: '#0080FE',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#0080FE',
      },

    }
  };


  return (

    <Stack
      direction="row"
      sx={{
        marginTop: '1rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="column" sx={{ width: '70%' ,  gap: '1rem' }}>

      {/* Input field for new task */}
      <TextField
        value={newTask.title}
        onChange={(e) => setNewTask({...newTask, title:e.target.value})}
        label="New Task"
        variant="outlined"
        id="outlined-basic"
        sx={{
          ...textStyle,
        }}
      />
      {/*Input field for task details */}
      <TextField
        value={newTask.details}
        onChange={(e) => setNewTask({...newTask, details: e.target.value})}
        label="Details"
        variant="outlined"
        id="outlined-basic-details"
        sx={{
          ...textStyle,
        }}
      />
      </Stack>

      {/* Button to add task */}
      <Button
        variant="outlined"
        sx={{
          fontSize: '0.9em',
          padding: '0.3rem ',
          width: '25%',
          height: 'fit-content',
          background: theme.palette.success.main,
          '&:hover': {
                            bgcolor: theme.palette.success.dark,
                          },
          color: theme.palette.success.contrastText,
          borderRadius: '1rem'
        }}
        onClick={addTask}
      >
        ADD A TASK
      </Button>

    </Stack>

  );
}