import React from 'react';

var {View, StyleSheet} = require('react-native');
import {Button} from 'react-native-elements'

import {validate} from '../utils/validate'

import {Theme} from "../"

const {padding} = Theme;

import AuthTextInput from "../components/TextInput"

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        const fields = props.fields;
        const state = {};
        const error = {};

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var {key, type, value} = field;
            state[key] = {type: type, value: value};
            error[key] = ""
        }

        state["error"] = error;

        this.state = state;

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        var data = this.state;
        const result = validate(data);

        if (!result.success) this.setState({error: result.error});
        else this.props.onSubmit(this.extractData(data));
    }

    extractData(data){
        var retData = {};

        Object.keys(data).forEach(function(key) {
            if (key !== "error"){
                var { value } = data[key];
                retData[key] = value.toString();
            }
        });

        return retData;
    }

    onChange(key, text) {
        let state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    }

    render() {
        const fields = this.props.fields

        return (
            <View style={styles.container}>
                {
                    fields.map((data, idx) => {
                        var {key, label, placeholder, autoFocus, secureTextEntry} = data;
                        return (
                            <AuthTextInput 
                               key={key}
                               label={label}
                               placeholder={placeholder}
                               autoFocus={autoFocus}
                               onChangeText={(text) => this.onChange(key, text)}
                               secureTextEntry={secureTextEntry}
                               value={this.state[key]['value']}
                               error={this.state.error[key]}/>
                        )
                    })
                }

                <Button
                    raised
                    title={'Үргэлжлүүлэх'}
                    borderRadius={4}  //optional
                    backgroundColor={"#397af8"} //optional
                    containerViewStyle={styles.buttonContainer} //optional
                    buttonStyle={styles.button} //optional
                    textStyle={{}}//optional
                    onPress={this.onSubmit}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    buttonContainer: {
        marginVertical: padding * 2,
        marginHorizontal: 0
    },

    button: {}
});


