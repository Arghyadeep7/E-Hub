import { createSlice } from "@reduxjs/toolkit";

const initialSearch={
    search:""
}

const searchSlice=createSlice({
    name:'Search',
    initialState:initialSearch,
    reducers:{
        setSearch(state,action){
            state.search=action.payload;
        }
    }
});

export const searchActions=searchSlice.actions;

export default searchSlice.reducer;