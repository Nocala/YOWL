import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import ScreenWrapper from '../components/SreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Button from '../components/Button'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const passwordRef = useRef(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
                Animated.timing(translateY, {
                    toValue: -150,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Attention !', "Tu dois remplir tous les champs !");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://16.171.155.129:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await SecureStore.setItemAsync("authToken", data.token);

                const storedToken = await SecureStore.getItemAsync("authToken");
                console.log("Token stocké avec succès :", storedToken);
                Alert.alert('Tu es connecté !', 'Bon retour parmi nous 🥹', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/home')
                    }
                ]);

            } else if (data.error === 'Il semble que tu n\'as pas de compte...') {
                Alert.alert('Oups...', 'Il semble que tu n\'as pas de compte...', [
                    {
                        text: 'Crée en un !',
                        onPress: () => router.push('/signUp')
                    }
                ]);
            } else {
                Alert.alert('Oups...', data.error || 'Erreur de connexion');
            }

        } catch (error) {
            Alert.alert('Oups...', 'Erreur de connexion 😬');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/background_login.png')}
                    style={styles.background}>
                    <ScreenWrapper>
                        <StatusBar style='dark' />
                        <Animated.View style={[styles.innerContainer, { transform: [{ translateY }] }]}>
                            <BackButton onPress={() => router.push('/Welcome')} />

                            {/* Welcome */}
                            <View>
                                <Text style={styles.welcomText}>Hey,</Text>
                                <Text style={styles.welcomText}>welcome back !</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                <Input
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={email}
                                    onChangeText={setEmail}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                                />
                                <Input
                                    ref={passwordRef}
                                    placeholder='Mot de passe'
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={password}
                                    onChangeText={setPassword}
                                    returnKeyType="go"
                                    onSubmitEditing={handleLogin}
                                />
                                <Text style={styles.forgotPassword}>
                                    Mot de passe oublié ?
                                </Text>
                                {/* Button login */}
                                <Button title='Me connecter' loading={loading} onPress={handleLogin} />
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Tu n'as pas de compte ?
                                </Text>
                                <Pressable onPress={() => router.push('signUp')}>
                                    <Text style={[styles.footerText, { color: theme.colors.orange, fontWeight: theme.fonts.semibold }]}>
                                        Inscris-toi ici !
                                    </Text>
                                </Pressable>
                            </View>
                        </Animated.View>
                    </ScreenWrapper>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;

const styles = StyleSheet.create({
    ScreenWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        gap: 20,
        padding: wp(5),
        backgroundColor: theme.colors.whiteorange,
        borderRadius: theme.radius.xxl,
        alignSelf: 'center',
        justifyContent: 'center',
        maxHeight: '70%',
    },
    welcomText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.orange,
    },
    form: {
        gap: 25,
    },
    forgotPassword: {
        textAlign: 'left',
        fontWeight: theme.fonts.medium,
        color: theme.colors.orange
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    },
    backButton: {
        marginBottom: 5,
    }
});