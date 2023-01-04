import { createSlice } from "@reduxjs/toolkit";

const initialType={
    type:""
}

const typeSlice=createSlice({
    name:'Type',
    initialState:initialType,
    reducers:{
        setType(state,action){
            state.type=action.payload;
        }
    }
});

export const typeActions=typeSlice.actions;

export default typeSlice.reducer;