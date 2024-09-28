import { createSlice } from "@reduxjs/toolkit";
export const toggleSlice = createSlice({
    name:'toggle',
    initialState:{
        isOn:false,
    },
    reducers:{
        toggleSwitch:(state)=>{state.isOn=!state.isOn},
    },
});
export const {toggleSwitch} = toggleSlice.actions;
export default toggleSlice.reducer;