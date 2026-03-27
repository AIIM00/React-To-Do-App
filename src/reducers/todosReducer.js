// -----------------------------
// Import
// -----------------------------
import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newToDo = {
        id: uuidv4(),
        title: action.payload.title,
        details: action.payload.details,
        done: false,
      };
      return [...currentTodos, newToDo];
    }
    case "done": {
      return currentTodos.map((task) =>
        task.id === action.payload.id ? { ...task, done: true } : task,
      );
    }
    case "undo":
      return currentTodos.map((task) =>
        task.id === action.payload.id ? { ...task, done: false } : task,
      );

    case "edit":
      return currentTodos.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task,
      );

    case "delete":
      return currentTodos.filter((task) => task.id !== action.payload.id);

    default:
      return currentTodos;
  }
}
