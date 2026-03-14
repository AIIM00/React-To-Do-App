// -----------------------------
// Imports
// -----------------------------
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Header from './Header';
import ToDo from './ToDo';
import ToastCard from './ToastCard';
import AddTaskCard from './AddTaskCard';


import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect} from 'react';

//USE CONTEXT
import { TaskContext } from "../contexts/TaskContext";


//import theme from '../assets/theme';

// -----------------------------
//Imports For Swiper
// -----------------------------
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Icons
import { IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  function addTask(task) {
    if (!task.title.trim()) return;
    const newToDo = {
        id: uuidv4(),
        title: task.title,
        details: task.details,
        done: false,
      }
    const updatedToDo = [
      ...taskArr,newToDo
      ,
    ] 
    setTasks(updatedToDo);
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
      <Header />
        <AddTaskCard addTask={addTask} />
    </Stack>
        {/* Render all task cards */}
        <SimpleSwiper slides = {taskCard}/>         
        {/* Add Task Section */}
        <ToastCard toastType={toastType} clearToast={() => setToastType('')}/>
      </Container>
    </TaskContext.Provider>

  );
  
}

//Simple Swiper Component
function SimpleSwiper({slides}) {
  const arrowBtnStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '10',
    cursor: 'pointer',
    fontSize: '2rem',
    color: '#000',
    userSelect: 'none',
  };
  return (
    <Swiper
  direction="vertical"
  slidesPerView={3}
  spaceBetween={10}
  mousewheel={true}
  modules={[Navigation, Pagination, Mousewheel]}
  pagination={{ clickable: true }}
  navigation={{
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  }}
  style={{ marginTop:'1rem',padding:'5rem 2rem', height:'500px',position: "relative" }}
>
  {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {slide}
        </SwiperSlide>
      ))}

  {/* Custom arrows */}
  <IconButton
                    className='swiper-button-prev-custom'
                    aria-label="add new task"
                    size="large"
                    sx={{ ...arrowBtnStyle,
                        top: 0,
                        color: 'primary.main' ,
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                          },

                    }}
                  >
                    <ExpandLessIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    className='swiper-button-next-custom'
                    aria-label="add new task"
                    size="large"
                    sx={{ ...arrowBtnStyle,
                        bottom: 0,
                        color: 'primary.main' ,
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                          },

                    }}
                  >
                    <ExpandMoreIcon fontSize="large" />
                  </IconButton>
</Swiper>
  );
}