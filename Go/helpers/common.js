const { Dimensions } = require("react-native");

const {width: deviceWidth, height: deviceHeigth} = Dimensions.get('window');

export const hp = percentage=>{
    return (percentage*deviceHeigth) / 100;
}
export const wp = percentage=>{
    return (percentage*deviceWidth) / 100;
}