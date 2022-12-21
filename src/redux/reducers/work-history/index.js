let initState = {
  isStartWork: false,
  project: "Project1",
  stream: {},
  duration: 0,
};
export const WorkHistoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_WORK_STATUS":
      return { ...state, isStartWork: action.payload };
    case "SET_PROJECT":
      return { ...state, project: action.payload };
    case "SET_STREAM":
      return { ...state, stream: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };

    default:
      return state;
  }
};
