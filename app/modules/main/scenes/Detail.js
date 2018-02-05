import React from 'react';
var { View, StyleSheet, Alert, ListView, Text,TouchableHighlight,ToastAndroid, Image} = require('react-native');

import {Button,List, ListItem} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { color } from "../../../styles/Theme"

import { actions as auth } from "../../auth"
import * as firebase from "firebase";
var { detail } = auth;

class Detail extends React.Component {

    constructor(){
        super();

        this.state = {
            titleOfArticle: '',
            id: '',
            body: '',
            spinner:false
        };

        console.ignoredYellowBox = [
            'Setting a timer',
            'Possible Unhandled'
        ];
    }

    backButton() {
        Actions.Main()
    }

    componentDidMount(){
        this.fetchUsers();
    }

    async fetchUsers(){

        let newsPath = "/news/"+this.props.newsId;
        try {
            await firebase.database().ref(newsPath).on('value', (snapshot) => {
                var news = "";

                if (snapshot.val()) {
                    news = snapshot.val()
                }

                var title1 = news.title;

                this.setState({
                    titleOfArticle: title1,
                    id: news.id,
                    body: news.body
                });
            });
        }catch (error) {
            this.setState({
                response: error.toString()
            })
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.heading}>{this.state.titleOfArticle}</Text>
                <Text style={styles.body}>{this.state.body}</Text>
                <Button
                    raised
                    title={'Буцах'}
                    borderRadius={4}
                    backgroundColor={color.main}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={{}} //optional
                    textStyle={styles.buttonText}
                    onPress={this.backButton}/>
            </View>
        );
    }
}
export default connect(null, { detail })(Detail);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding:10,
        backgroundColor: '#f4f4f4',
        marginBottom: 3
    },

    rowText:{
        flex:1
    },

    buttonContainer:{
        marginVertical:0, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    },

    heading:{
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },

    body:{
        margin:10
    }
});



