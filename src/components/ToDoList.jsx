// -----------------------------
// COMPONENTS IMPORTS
// -----------------------------
import Container from '@mui/material/Container';
import Header from './Header';
import ToDo from './ToDo';
import ToastCard from './ToastCard';
import AddTaskCard from './AddTaskCard';


import { useState, useEffect, useReducer} from 'react';

//Use Reducer
import todosReducer from '../reducers/todosReducer';

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

// =====================================================
// MAIN COMPONENT : ToDoList
// Holds the tasks state and handles task actions
// =====================================================
export default function ToDoList() {

  // ---------------------------------------------------
  // State: list of tasks
  // Each task contains id, title, details, and status
  // ---------------------------------------------------
  const [taskArr, dispatch] = useReducer(todosReducer, [], () => {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    return storageTodos
  });
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
      dispatch({ type: 'done', payload: { id } });
      break;

    case 'undo':
      setToastType(action);
      dispatch({ type: 'undo', payload: { id } });
      break;
    case 'edit': {
      const newTitle = prompt("Enter new Title:");
      if (!newTitle || !newTitle.trim()) return;
      setToastType(action);
      dispatch({
        type: 'edit',
        payload: { id, title: newTitle }
      });
      break;
}

    case 'delete': {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) break;

      setToastType(action);
      dispatch({ type: 'delete', payload: { id } });
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
    
       dispatch({type:'add',payload:{
        title: task.title,
        details: task.details,
       }})
        
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
        borderRadius: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        
      }}
      >
      <AddTaskCard addTask={addTask} />

        {/* Page Header */}
        
      <Header />
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
  return (
    <Swiper
  direction="vertical"
  slidesPerView={'auto'}
  spaceBetween={20}
  mousewheel={true}
  modules={[Navigation, Pagination, Mousewheel]}
  pagination={{ clickable: true,
   }}
  style={{
    marginTop:'1rem',
    height:'28rem',
    padding:'2rem',
  }}
>
  {slides.map((slide, index) => (
        <SwiperSlide key={index} style={{ height: "auto" }} >
            {slide}
        </SwiperSlide>
      ))}
</Swiper>
  );
}