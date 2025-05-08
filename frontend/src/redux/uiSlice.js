import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isOpenAddModal: false,
  isEditTodoModalOpen: false
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
    }
  }
})

export const {
  toggleDarkMode,
  setAddModal,
  setEditModal,
}  = uiSlice.actions;

export default uiSlice.reducer;


// Those lines are Redux selector functions - an important pattern in Redux for efficiently accessing data from the store
export const selectIsAddTodoModalOpen = (state) => state.uiSlice.isOpenAddModal;
export const selectIsEditTodoModalOpen = (state) => state.uiSlice.isEditTodoModalOpen;
export const selectIsDarkMode = (state) => state.uiSlice.isDarkMode;