import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import User from '../assets/icons/User';
import Message from '../assets/icons/Message';
import Logo from '../assets/images/LogoGo.png';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.icons}>
                <TouchableOpacity style={styles.icon}>
                    <Message strokeWidth={1.5} color={theme.colors.textDark} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <User strokeWidth={1.5} color={theme.colors.textDark} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.colors.whiteorange,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.colors.gray,
    },
    logo: {
        width: 40,
        height: 40, 
        resizeMode: 'contain',
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 16,
    },
});

export default Header;