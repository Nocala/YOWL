import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import User from '../assets/icons/User';
import Message from '../assets/icons/Message';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MyApp</Text>
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
    },
    logo: {
        fontSize: 24,
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary,
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 16,
    },
});

export default Header