import { createSlice } from '@reduxjs/toolkit';
import { addPet, getPetList } from './petsThunk';


const handleListPending = (state) => {
    state.loading.list = true
};

const handleListFulfilled = (state, action) => {
    state.loading.list = false
    state.petsList = action.payload
};

const handleListRejected = (state) => {
    state.loading.list = false
    state.petsList = []
};

const handleAdd = (state, action) => {
  switch (action.type) {
    case addPet.pending.type:
      state.loading.add = true;
      break;
    case addPet.fulfilled.type:
    case addPet.rejected.type:
      state.loading.add = false;
      break;
    default:
      return;
  }
};

const petsSlice = createSlice({
    name: 'pets',
    initialState: {
      petsList: [],
      loading: {
        list: false,
        add: false,
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPetList.pending, handleListPending)
        .addCase(getPetList.fulfilled, handleListFulfilled)
        .addCase(getPetList.rejected, handleListRejected)
        .addCase(addPet.pending, handleAdd)
        .addCase(addPet.fulfilled, handleAdd)
        .addCase(addPet.rejected, handleAdd);
    },
  });
  
export default petsSlice.reducer;
  
export const selectUserPets = (state) => state.pets.petsList;
export const selectPetsLoading = (state) => state.pets.loading;
export const selectPetsError = (state) => state.pets.error;