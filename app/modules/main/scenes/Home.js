import React from 'react';
var { View, StyleSheet, Alert, ListView, Text,TouchableHighlight,ToastAndroid, Image} = require('react-native');

import {Button,List, ListItem} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { color } from "../../../styles/Theme"

import { actions as auth } from "../../auth"
import * as firebase from "firebase";
var { signOut } = auth;

class Home extends React.Component {
    constructor(){
        super();
        const dSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            newsDataSource: dSource,
            spinner:false
        };


        console.ignoredYellowBox = [
            'Setting a timer',
            'Possible Unhandled'
        ];
    }

    onSignOut() {
        this.setState({spinner: true});
        firebase.auth().signOut().then(function() {
            Actions.Welcome();
        }, function(error) {
          ToastAndroid.showWithGravity(
              'Холболт амжилтгүй',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
        });
    }

    onSuccess() {
        Actions.replace("Welcome")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    extend(base) {
        var parts = Array.prototype.slice.call(arguments, 1);
        parts.forEach(function (p) {
            if (p && typeof (p) === 'object') {
                for (var k in p) {
                    if (p.hasOwnProperty(k)) {
                        base[k] = p[k];
                    }
                }
            }
        });
        return base;
    }

    fetchUsers(){

        let newsPath = "/news";
        var news = "";
        firebase.database().ref('news').on('value', (newsSnap) => {
            news = newsSnap.val();
            this.setState({
                newsDataSource: this.state.newsDataSource.cloneWithRows(news)
            });
        });


        // firebase.database().ref(newsPath).on('value', (snapshot) => {

        //     var news = "";

        //     if (snapshot.val()) {
        //         news = snapshot.val()
        //     }

        //     this.setState({
        //         newsDataSource: this.state.newsDataSource.cloneWithRows(news)
        //     });
        // });
        
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         this.setState({
        //             newsDataSource: this.state.newsDataSource.cloneWithRows(response)
        //         });
        //     });
    }

    componentDidMount(){
        this.fetchUsers();
    }

    renderRow(news, sectionId, rowId, highlightRow){

        return(
            <TouchableHighlight onPress={() => this._onPressList(news)}>
                <View style={styles.row}>
                    <Text style={styles.rowText}> {news.title}</Text>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: news.image}}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    _onPressList(data){
        //  ToastAndroid.showWithGravityAndOffset(
        //   data.title,
        //   ToastAndroid.LONG,
        //   ToastAndroid.BOTTOM,
        //   25,
        //   50
        // );
        this.setState({spinner: false});
        Actions.NewsDetail({newsId:data.id-1});
    }

    render() {
        return (
                <View>
                    <List>
                        <ListView
                            dataSource={this.state.newsDataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </List>
                    <Button
                        raised
                        title={'Гарах'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={this.onSignOut.bind(this)}/>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Түр хүлээнэ үү...'}
                        textStyle={{ color: '#fff' }} />
                </View>
            // <View style={styles.container}>
                
            //     <Button
            //         raised
            //         title={'LOG OUT'}
            //         borderRadius={4}
            //         backgroundColor={color.main}
            //         containerViewStyle={styles.buttonContainer}
            //         buttonStyle={{}} //optional
            //         textStyle={styles.buttonText}
            //         onPress={this.onSignOut.bind(this)}/>
            // </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user
    }
}

export default connect(mapStateToProps, { signOut })(Home);


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
    }
});



