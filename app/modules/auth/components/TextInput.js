import React, {Component} from 'react';

var { View, StyleSheet} = require('react-native');

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../utils/validate'
import {Theme} from "../"

const {misc} = Theme;

export default class AuthTextInput extends Component {
    render() {
        return (
                <View style={styles.formWrapper}>
                    <FormLabel>{this.props.label}</FormLabel>
                    <FormInput
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        underlineColorAndroid={"#fff"}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        onChangeText={this.props.onChangeText}
                        secureTextEntry={this.props.secureTextEntry}
                        inputStyle={styles.inputContainer}

                        value={this.props.value}/>
                    {
                        (!isEmpty(this.props.error)) &&
                        <FormValidationMessage
                            containerStyle={{}}>
                            {this.props.error}
                        </FormValidationMessage>
                    }
                </View>
        );
    }
}

const styles = StyleSheet.create({
    formWrapper: {
    },

    inputContainer:{
        width:misc.window_width - 40
    },
});