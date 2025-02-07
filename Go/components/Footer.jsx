import * as React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter, usePathname } from "expo-router"
import { theme } from '../constants/theme'
import Home from "../assets/icons/Home"
import Search from "../assets/icons/Search"
import Basketball from "../assets/icons/Basket-ball_Ball"
import News from "../assets/icons/News"
import Icon from "../assets/icons/Index"

const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();

    //console.log("Page actuelle :", pathname);

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={pathname !== '/home' ? () => {
                    //console.log("Navigation vers /home");
                    router.push('/home');
                } : null}
            >
                <Home strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={pathname !== '/search' ? () => {
                    //console.log("Navigation vers /search");
                    router.push('/search');
                } : null}
            >
                <Search strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.iconContainer, styles.basketballContainer]}
                onPress={pathname !== '/events' ? () => {
                    //console.log("Navigation vers /events");
                    router.push('/events');
                } : null}
            >
                <Basketball strokeWidth={1.5} color={theme.colors.orange} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={pathname !== '/news' ? () => {
                    //console.log("Navigation vers /news");
                    router.push('/news');
                } : null}
            >
                <News strokeWidth={1.5} color={theme.colors.blueDark} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={pathname !== '/creation_post' ? () => {
                    //console.log("Navigation vers /creation_post");
                    router.push('/creation_post');
                } : null}
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
        paddingBottom: 30
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