import * as t from './actionTypes';
import * as api from './api';

export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.createUserWithEmailAndPassword(data, function (success, user, error) {
            if (success) {
                dispatch({type: t.LOGIN_SUCCESS, user: data});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithEmailAndPassword(data, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGIN_SUCCESS, user: data});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function signInWithFacebook(facebookToken, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGIN_SUCCESS, user: data.user});
                successCB(data.newUser);
            }else if (error) errorCB(error)
        });
    };
}

export function updateUser(userId, data, successCB, errorCB) {
    return (dispatch) => {
        api.updateUser(userId, data, function (succss, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}