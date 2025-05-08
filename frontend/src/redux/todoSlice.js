import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialTodos = {
  selectedTodo: null,
  filterStatus: 'all',
}


// const todoSlice createSlice({
//   name: 'todoSlice',
//   initialTodos,
//   reducers: {
//     // Reducer for updating value
//     setValue: (state, action) => {
//       state.value = action.payload;
//     },
//     // Reducer for changing status
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     }
//   }
//
// })