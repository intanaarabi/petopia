import { createSlice } from '@reduxjs/toolkit';
import { addPet, getPetList } from './petsThunk';


const handleListPending = (state) => {
    state.loading.list = true
};

const handleListFulfilled = (state, action) => {
    state.petsList = action.payload
    state.loading.list = false
    state.error.list = false
};

const handleListRejected = (state, action) => {
    state.petsList = [],
    state.loading.list = false
    state.error.list = action.payload
};

const handleAddPending = (state) => {
    state.loading.add = true
}

const handleAddFulfilled = (state) => {
    state.loading.add = false
    state.error.add = null
}
const handleAddRejected = (state, action) => {
    state.loading.add = false
    state.error.add = action.payload
}

const petsSlice = createSlice({
    name: 'pets',
    initialState: {
      petsList: [],
      loading: {
        list: false,
        add: false,
        edit: false
      },
      error: {
        list: false,
        add: false,
        edit: false,
        delete: false
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPetList.pending, handleListPending)
        .addCase(getPetList.fulfilled, handleListFulfilled)
        .addCase(getPetList.rejected, handleListRejected)
        .addCase(addPet.pending, handleAddPending)
        .addCase(addPet.fulfilled, handleAddFulfilled)
        .addCase(addPet.rejected, handleAddRejected)
    },
  });
  
  export default petsSlice.reducer;
  
export const selectUserPets = (state) => state.pets.petsList;
export const selectPetsLoading = (state) => state.pets.loading;
export const selectPetsError = (state) => state.pets.error;