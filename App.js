import React, { Component } from 'react';

import { Provider } from 'react-redux';

import Router from './app/config/routes'
import store from './app/redux/store';

export default class App extends Component {
	constructor() {
     super();

     console.ignoredYellowBox = [
         'Setting a timer'
     ];
     console.ignoredYellowBox = [
         'Possible Unhandled'
     ];
 }
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}