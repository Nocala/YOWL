import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
                Alert.alert('Login', 'Connexion réussie !', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/home')
                    }
                ]);

            } else {
                Alert.alert('Login', data.error || 'Erreur de connexion');
            }
        } catch (error) {
            Alert.alert('Login', 'Erreur de connexion');
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
                        <View style={styles.innerContainer}>
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
                                />
                                <Input
                                    placeholder='Mot de passe'
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <Text style={styles.forgotPassword}>
                                    Mot de passe oublié ?
                                </Text>
                                {/* Button login */}
                                <Button title='Login' loading={loading} onPress={handleLogin} />
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Tu n'as pas de compte ?
                                </Text>
                                <Pressable onPress={() => router.push('signUp')}>
                                    <Text style={[styles.footerText, { color: theme.colors.orange, fontWeight: theme.fonts.semibold }]}>Inscris-toi ici !</Text>
                                </Pressable>
                            </View>
                        </View>
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