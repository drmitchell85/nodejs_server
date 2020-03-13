// action creators which creates change in the redux side of our app; modify state in our redux store

import axios from 'axios'; // helps with network request
import { FETCH_USER } from './types';

// Using ReduxThunk: action creator fetchUser is called
// ReduxThunk sees a function is being returned and automically call it with dispatch
// Then request is made with axios; upon response we dispatch our action
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

// POST request to backend server for Stripe token handling
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    // returns user model and authReducer will automatically update anything needing the updated user model
    dispatch({ type: FETCH_USER, payload: res.data });
}