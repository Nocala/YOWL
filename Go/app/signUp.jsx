import { Alert, View, Text, TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

const SignUp = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    const onSubmit = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Inscription', "Veuillez remplir tous les champs !");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Inscription', "Les mots de passe ne correspondent pas !");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://16.171.155.129:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setUserId(data.userId);
                await SecureStore.setItemAsync('userId', data.userId.toString());
                await SecureStore.setItemAsync('username', username);
                console.log('User ID:', data.userId);
                console.log('Username:', username);
                Alert.alert('Inscription', 'Utilisateur créé avec succès !', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/creation_profil_1')
                    }
                ]);
            } else {
                Alert.alert('Inscription', data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            Alert.alert('Inscription', 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={require('../assets/images/background_login.png')}
                style={styles.background}>
                <ScreenWrapper>
                    <StatusBar style='dark' />
                    <View style={styles.innerContainer}>
                        <BackButton onPress={() => router.push('/Welcome')} />

                        {/* Welcome */}
                        <View>
                            <Text style={styles.welcomText}>C'est parti !</Text>
                        </View>

                        {/* form */}
                        <View style={styles.form}>
                            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                                Please fill the details to create a new account
                            </Text>
                            <Input
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChangeText={setUsername}
                            />
                            <Input
                                placeholder='Adresse email'
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
                            <Input
                                placeholder='Confirmation du mot de passe'
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <Button title='Sign Up' loading={loading} onPress={onSubmit} />
                        </View>
                        {/* footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account !
                            </Text>
                            <Pressable onPress={() => router.push('login')}>
                                <Text style={[styles.footerText, { color: theme.colors.orange, fontWeight: theme.fonts.semibold }]}>Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScreenWrapper>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        padding: wp(5),
        backgroundColor: theme.colors.whiteorange,
        borderRadius: theme.radius.xxl,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    welcomText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.orange,
        paddingBottom: 20,
    },
    form: {
        gap: 25,
        paddingBottom: 20,
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
        fontSize: hp(1.6),
    },
});