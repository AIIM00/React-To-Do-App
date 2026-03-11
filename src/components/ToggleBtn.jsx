// ---------------------------------------------------
// React
// ---------------------------------------------------
import {useContext} from 'react';


// ---------------------------------------------------
// Material UI Components
// ---------------------------------------------------
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {TaskContext} from "../contexts/TaskContext";

// =====================================================
// COMPONENT : ToggleButtons
// Used to filter tasks (All / Done / Undone)
// =====================================================
export default function ToggleButtons() {


// ---------------------------------------------------
  // State: stores the currently selected filter
  // ---------------------------------------------------


  const {filter, setFilter } = useContext(TaskContext);
  

  // ---------------------------------------------------
  // Handles toggle button changes
  // Updates the selected filter
  // ---------------------------------------------------
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null){
      setFilter(newAlignment);
    }
  };


  return (

    <ToggleButtonGroup
      value={filter}        // currently selected button
      exclusive                // only one button can be selected
      onChange={handleAlignment}
      aria-label="task filter"
    >

      {/* Show all tasks */}
      <ToggleButton value="all">
        All
      </ToggleButton>

      {/* Show completed tasks */}
      <ToggleButton value="done">
        Done
      </ToggleButton>

      {/* Show incomplete tasks */}
      <ToggleButton value="undone">
        Undone
      </ToggleButton>

    </ToggleButtonGroup>

  );

}