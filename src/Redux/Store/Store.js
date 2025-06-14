import { configureStore } from "@reduxjs/toolkit";
import JobsDataReducer from "../Slices/JobsDataSlice";

export const Store = configureStore({
    reducer: {
        JobsData:JobsDataReducer
    }
})