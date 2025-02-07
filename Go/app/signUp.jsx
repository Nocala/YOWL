import { Alert, View, Text, TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
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

    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const validatePassword = (password) => {
        setIsLengthValid(password.length >= 12);
        setHasNumber(/\d/.test(password));
        setHasUppercase(/[A-Z]/.test(password));
        setHasSpecialChar(/[!@#$%^&*]/.test(password));
    };

    const onPasswordChange = (password) => {
        setPassword(password);
        validatePassword(password);
    };

    const onSubmit = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Attends', "Tu dois remplir tous les champs 😶‍🌫️");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Attention', "Les mots de passe ne correspondent pas 😡");
            return;
        }

        if (!isLengthValid || !hasNumber || !hasUppercase || !hasSpecialChar) {
            Alert.alert('Non mais oh', "Le mot de passe ne respecte pas les conditions de sécurité !");
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
                            Remplis tous les champs pour créer un nouveau compte 
                            </Text>
                            <Input
                                ref={usernameRef}
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChangeText={setUsername}
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
                            />
                            <Input
                                ref={emailRef}
                                placeholder='Adresse email'
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                                returnKeyType="next"
                                onSubmitEditing={() => confirmPasswordRef.current && confirmPasswordRef.current.focus()}
                            />
                            <Input
                                ref={passwordRef}
                                placeholder='Mot de passe'
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={password}
                                onChangeText={onPasswordChange}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                            />
                            <Text style={[styles.securedPassword, isLengthValid && styles.valid]}>•12 caractères</Text>
                            <Text style={[styles.securedPassword, hasNumber && styles.valid]}>•Un chiffre</Text>
                            <Text style={[styles.securedPassword, hasUppercase && styles.valid]}>•Une majuscule</Text>
                            <Text style={[styles.securedPassword, hasSpecialChar && styles.valid]}>•Au moins un caractère spécial (!@#$%^&*)</Text>

                            <Input
                                ref={confirmPasswordRef}
                                placeholder='Confirmation du mot de passe'
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                returnKeyType="go"
                                onSubmitEditing={onSubmit}
                            />
                            <Button title='Créer mon compte' loading={loading} onPress={onSubmit} />
                        </View>
                        {/* footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                J'ai déja un compte :
                            </Text>
                            <Pressable onPress={() => router.push('login')}>
                                <Text style={[styles.footerText, { color: theme.colors.orange, fontWeight: theme.fonts.semibold }]}>Je me connecte !</Text>
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
    securedPassword: {
        textAlign: 'left',
        fontSize: hp(1.3),
        fontWeight: theme.fonts.medium,
        color: theme.colors.textLight,
        marginTop: -15,
        marginBottom: -8,
    },
    valid: {
        color: 'green',
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