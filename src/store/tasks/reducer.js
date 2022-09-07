const defaultState = {
  tasks: [],
};

export const tasksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};
