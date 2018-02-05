var { AsyncStorage } = require('react-native');

import * as t from './actionTypes';

let initialState = { loggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            var user = action.user;
            var refreshToken = user.refreshToken;
            AsyncStorage.setItem('refreshToken', refreshToken);
            AsyncStorage.setItem('user', JSON.stringify(user));

            state = Object.assign({}, state, {loggedIn: true, user: user });

            return state;

        case t.LOGGED_OUT:
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('user');
            state = Object.assign({}, state, {loggedIn: false, user: null });

            return state;

        default:
            return state;
    }
};

export default authReducer;