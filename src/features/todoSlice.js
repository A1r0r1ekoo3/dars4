import { createSlice } from "@reduxjs/toolkit";

function localStoreState() {
  JSON.parse(localStorage.getItem("todos")) || [];
}

const initialState = {
  todos: [],
  completed: 0,
  unCompleted: 0,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleCompleted: (state, { payload }) => {
      const todo = state.todos.find((todo) => todo.id === payload);
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    statistics: (state) => {
      let completedCounter = 0;
      let unCompletedCounter = 0;
      {
        state.todos &&
          state.todos.forEach((todo) => {
            if (todo.completed) completedCounter++;
            else unCompletedCounter++;
          });
      }
      state.completed = completedCounter;
      state.unCompleted = unCompletedCounter;
    },
  },
});

export const { addTodo, removeTodo, toggleCompleted, statistics } =
  todoSlice.actions;

export default todoSlice.reducer;
