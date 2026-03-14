import ToDoList from "./components/ToDoList";
import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToDoList/>
    </ThemeProvider>
  )
}
export default App
