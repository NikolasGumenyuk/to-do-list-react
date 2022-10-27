const defaultState = {
  tasks: [],
};

export const tasksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return { ...state, tasks: [...action.payload] };
    case "ADD_TASKS":
      return {...state, tasks: [...state.tasks, action.payload]};
    case "DELETE_TASK":
      return {...state, tasks: state.tasks.filter(task => task.task_id !== action.payload)};
    case "UPDATE_TASK":
      return {...state, tasks: state.tasks.map(task => task.task_id === action.payload.task_id ? action.payload : task)};
    default:
      return state;
  }
};
