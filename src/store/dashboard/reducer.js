// import { DASHBOARD_LOADED } from './actions'
// import { combineReducers } from "redux";


// function openedTasksReducer(state = {}, action) {
//     // ...
// }

// export default combineReducers({
//     today: (today = 0, {type, payload}) => type === DASHBOARD_LOADED ? payload.today : today,
//     lists: (lists = [], {type, payload}) => type === DASHBOARD_LOADED ? payload.lists : lists,
//     // openedTasks: openedTasksReducer
// })

const defaultState = {
    dashboard: {},
  };
  
  export const dashboardReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "LOAD_DASHBOARD":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  