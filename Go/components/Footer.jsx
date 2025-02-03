import * as React from "react";
import { View, StyleSheet } from "react-native";
import Home from "../assets/icons/Home";
import Search from "../assets/icons/Search";
import Basketball from "../assets/icons/Basket-ball_Ball";
import News from "../assets/icons/News";
import Reels from "../assets/icons/Reels";
import { theme } from '../constants/theme';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.iconContainer}>
                <Home strokeWidth={1.5} color={theme.colors.blueDark} />
            </View>
            <View style={styles.iconContainer}>
                <Search strokeWidth={1.5} color={theme.colors.blueDark} />
            </View>
            <View style={[styles.iconContainer, styles.basketballContainer]}>
                <Basketball strokeWidth={1.5} color={theme.colors.orange} />
            </View>
            <View style={styles.iconContainer}>
                <News strokeWidth={1.5} color={theme.colors.blueDark} />
            </View>
            <View style={styles.iconContainer}>
                <Reels strokeWidth={1.5} color={theme.colors.blueDark} />
            </View>
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
        transform: [{ scale: 1.5 }], // Increase the size of the basketball icon
    },
});

export default Footer;