import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';
import Detail from '../modules/main/scenes/Detail';

import firebase from "../config/firebase"

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    checkToken() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) this.setState({isReady: true, isLoggedIn: true})
            else this.setState({isReady: true, isLoggedIn: false})
        });
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="Нүүр" initial={true}/>
                        <Scene key="Register" component={Register} title="Бүртгүүлэх"/>
                        <Scene key="Login" component={Login} title="Нэвтрэх"/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Нүүр хуудас" initial={true} type={ActionConst.REPLACE}/>
                    </Stack>

                    <Stack key="NewsDetail" initial={this.state.isLoggedIn}>
                        <Scene key="Detail" component={Detail} title="Мэдээ" initial={true} type={ActionConst.REPLACE}/>
                    </Stack>
                </Scene>
            </Router>
        )
    }
}