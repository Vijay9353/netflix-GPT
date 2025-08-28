import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        languages: "en",
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.languages = action.payload;
        }
    },
})
export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer