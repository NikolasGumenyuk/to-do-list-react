import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const DASHBOARD_LOADED = 'dashboard/loaded'
export const loadDashboard = dispatch => {
    axios.get("http://localhost:4000/task/dashboard")
        .then(dashboard => dispatch({
            type: DASHBOARD_LOADED,
            payload: dashboard
        }))
}