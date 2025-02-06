import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme } from '../constants/theme';

import Home from "../assets/icons/Home";
import Search from "../assets/icons/Search";
import Basketball from "../assets/icons/Basket-ball_Ball";
import News from "../assets/icons/News";
import Icon from "../assets/icons/Index";

const Footer = () => {
    const router = useRouter();

    const handleNavigation = (path) => {
        if (router.pathname === path) return; // Empêche l'exécution si on est déjà sur la page
        router.push(path);
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={() => handleNavigation('/home')}
            >
                <Home strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={() => handleNavigation('/search')}
            >
                <Search strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.iconContainer, styles.basketballContainer]} 
                onPress={() => handleNavigation('/events')}
            >
                <Basketball strokeWidth={1.5} color={theme.colors.orange} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={() => handleNavigation('/news')}
            >
                <News strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={() => handleNavigation('/creation_post')}
            >
                <Icon name='plus_2' strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        backgroundColor: theme.colors.whiteorange,
        borderTopWidth: 0.2,
        borderTopColor: theme.colors.gray,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    basketballContainer: {
        transform: [{ scale: 1.5 }],
    },
});

export default Footer;