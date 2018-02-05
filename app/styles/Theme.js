var { Dimensions, Platform } = require('react-native');

const color = {
    black: "#010101",
    main: "#397af8",
    white: "#ffffff",
    grey: "#eaeaea"
}

const fontSize = {
    tiny: 12,
    smaller: 13,
    small: 14,
    regular: 15,
    large: 22
}

const fontFamily = {
}

const misc = {
    navbar_height: (Platform.OS === 'ios') ? 64 : 54,
    window_width: Dimensions.get('window').width,
    window_height: Dimensions.get('window').height
}

const padding = 8;


export {color, fontSize, fontFamily, misc, padding}