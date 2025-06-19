import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsList: [],
  filters: {
    titles: [],
    location: [],
    skills: [],
  },
  filteredJobs: [],
  appliedJobs: JSON.parse(localStorage.getItem("application")) || [],
};

const JobsDataSlice = createSlice({
  name: "JobsData",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.jobsList = action.payload;
      state.filteredJobs = action.payload;
        // console.log(action.payload);
    },
    setTitlesFilter: (state, action) => {
      state.filters.titles = action.payload;
      applyFilters(state);
    },
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
      applyFilters(state);
    },
    setSkillsFilter: (state, action) => {
      state.filters.skills = action.payload;
      applyFilters(state);
    },
    sortJobs: (state, action) => {
      state.filteredJobs = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
      // console.log(action.payload);
    },
  },
});

function applyFilters(state) {
  const { titles, location, skills } = state.filters;

  state.filteredJobs = state.jobsList.filter((job) => {
    const matchTitle = titles.length ? titles.includes(job.title) : true;

    const matchLocation = location.length
      ? location.includes(job.location)
      : true;

    const matchSkills = skills.length
      ? skills.every((skill) => job.skills.includes(skill))
      : true;

    return matchTitle && matchLocation && matchSkills;
  });
}

export const {
  setAllJobs,
  setTitlesFilter,
  setLocationFilter,
  setSkillsFilter,
  sortJobs,
  setAppliedJobs,
} = JobsDataSlice.actions;
export default JobsDataSlice.reducer;
