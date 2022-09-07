import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import dashboardReducer from "./dashboard/reducer";
import tasksReducer from "./tasks/reducer";

export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  tasks: tasksReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
