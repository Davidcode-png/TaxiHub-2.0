import Cookies from "universal-cookie";
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    
} from './types';

const cookies = new Cookies();

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };
    const x = cookies.get('csrftoken');
    console.log(x);
    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`http://127.0.0.1:8000//rest-auth/login`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });

            // dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};