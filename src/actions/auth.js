import { LOGIN_START } from './actionTypes';
import { LOGIN_SUCCESS } from './actionTypes';
import { LOGIN_FAILED } from './actionTypes';
import {APIUrls} from '../helpers/urls'
import { getFormBody } from '../helpers/utils';

export function startLogin() {
    return {
        type: LOGIN_START,
    }
}

export function loginFailed(errorMessage) {
  return {
      type: LOGIN_FAILED,
      error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
      type: LOGIN_SUCCESS,
      user: user,
  };
}

export function login(email, password) {
    return (dispatch) => {
        // to set the flag that inProgress is in progress or not
        dispatch(startLogin());
        const url = APIUrls.login();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                if (data.success) {
                    // dispatch action to save user
                    dispatch.loginSuccess(data.data.user)
                    return;
                }
                // if it is not successful then we have to dispatch an action saying login LOGIN_FAILED
                dispatch(loginFailed(data.message))
        })
    }
}