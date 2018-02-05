import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'; //Import the reducer

import { setupRNListener } from 'react-native-redux-listener';

const enhancer = compose(
    //inject store enhancer
    setupRNListener({
        monitorAppState: false,
        monitorNetInfo: true,
        monitorKeyboard: false,
        monitorDeepLinks: false,
        monitorBackButton: false,
    }),
    applyMiddleware(thunk),
);

// Connect our store to the reducers
export default createStore(reducers, enhancer);