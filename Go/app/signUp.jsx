import { Alert, View, Text, TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';

const SignUp = () => {
    const router = useRouter();
    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = ()=>{
        if(!emailRef.current || !passwordRef.current || !usernameRef.current || !confirmationpasswordRef.current){
            Alert.alert('Sign Up', "please fill all the fields!")
        }
        {
            router.push('creation_profil_1')
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={require('../assets/images/background_login.png')}
                style={styles.background}>
                <ScreenWrapper>
                    <StatusBar style='dark' />
                    <View style={styles.innerContainer}>
                        <BackButton router={router} />

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
                                onChangeText={value => usernameRef.current = value}
                            />
                            <Input
                                placeholder='Adresse email'
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={value => emailRef.current = value}
                            />
                            <Input
                                placeholder='Mot de passe'
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={value => passwordRef.current = value}
                            />
                            <Input
                                placeholder='Confirmation du mot de passe'
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={value => confirmPasswordRef.current = value}
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