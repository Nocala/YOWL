import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'
import User from '../assets/icons/User'
import Message from '../assets/icons/Message'

const Header = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/Go.png')} style={styles.logo} />
            <View style={styles.icons}>
                <TouchableOpacity style={styles.icon} onPress={() => router.push('/profile')}>
                    <User strokeWidth={1.5} color={theme.colors.textDark} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon} onPress={() => router.push('/messages')}>
                    <Message strokeWidth={1.5} color={theme.colors.textDark} />
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
        padding: 10,
        backgroundColor: theme.colors.whiteorange,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.colors.gray,
    },
    logo: {
        width: 45,
        height: 40,
        resizeMode: 'cover',
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 30,
        transform: [{ scale: 1.3 }],
    },
});

export default Header;