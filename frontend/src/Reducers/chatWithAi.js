import { createReducer } from "@reduxjs/toolkit";
 const initialState= {
    loading:false,
     result:[]
 }
 
export const chatWithAi = createReducer(initialState, {
    chatWithAiCreateRequest: (state) => {
      state.loading = true;
    },
    chatWithAiCreateSuccess: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },
    chatWithAiCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  });
  