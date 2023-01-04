import { createSlice } from "@reduxjs/toolkit";

const initialFilter={
    filter:""
}

const filterSlice=createSlice({
    name:'Filter',
    initialState:initialFilter,
    reducers:{
        setFilter(state,action){
            state.filter=action.payload;
        }
    }
});

export const filterActions=filterSlice.actions;

export default filterSlice.reducer;