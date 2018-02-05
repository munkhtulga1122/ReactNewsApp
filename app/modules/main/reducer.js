import * as t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [] };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected,});
            return state;

        case t.FIRST_ACTION:
            state = Object.assign({}, state, {data: action.data });
            return state;

        default:
            return state;
    }
};


export default authReducer;