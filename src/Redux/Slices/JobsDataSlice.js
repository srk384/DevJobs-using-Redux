import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsList: [],
  jobFilters:[]
};

const JobsDataSlice = createSlice({
  name: "JobsData",
  initialState,
  reducers: {
    setJobsData: (state, action) => {
      state.jobsList = action.payload
    //   console.log(action.payload);
    },
    setFilters: (state, action) => {
      state.jobFilters = action.payload
      console.log(action.payload);
    },
  },
});

export const { setJobsData, setFilters } = JobsDataSlice.actions;
export default JobsDataSlice.reducer;
