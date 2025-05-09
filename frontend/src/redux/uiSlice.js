import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isOpenAddModal: false,
  isEditTodoModalOpen: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || null,
}


const uiSlice = createSlice({
  name: 'uiSlice ',
  initialState,
  reducers: {
    // Reducer for updating value
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setAddModal: (state, action) => {
      state.isOpenAddModal = action.payload;
    },
    setEditModal: (state, payload) => {
      state.isEditTodoModalOpen = payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  }
})

export const {
  toggleDarkMode,
  setAddModal,
  setEditModal,login, logout
}  = uiSlice.actions;

export default uiSlice.reducer;


// Those lines are Redux selector functions - an important pattern in Redux for efficiently accessing data from the store
export const selectIsAddTodoModalOpen = (state) => state.uiSlice.isOpenAddModal;
export const selectIsEditTodoModalOpen = (state) => state.uiSlice.isEditTodoModalOpen;
export const selectIsDarkMode = (state) => state.uiSlice.isDarkMode;
export const selectIsAuthenticated = (state) => state.uiSlice.isAuthenticated;
export const selectUser = (state) => state.uiSlice.user;