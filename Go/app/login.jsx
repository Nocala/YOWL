import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
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
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Login', "please fill all the fields!");
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
                    email: emailRef.current,
                    password: passwordRef.current,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Connexion réussie, rediriger l'utilisateur ou stocker le token JWT
                Alert.alert('Login', 'Connexion réussie !');
                // Exemple de redirection :
                // router.push('/home');
            } else {
                // Afficher un message d'erreur
                Alert.alert('Login', data.error || 'Erreur de connexion');
            }
        } catch (error) {
            Alert.alert('Login', 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background_login.png')}
            style={styles.background}>
            <ScreenWrapper>
                <StatusBar style='dark' />
                <View style={styles.container}>
                    <BackButton router={router} />

                    {/* Welcome */}
                    <View>
                        <Text style={styles.welcomText}>Hey,</Text>
                        <Text style={styles.welcomText}>welcome back !</Text>
                    </View>

                    {/* form */}
                    <View style={styles.form}>
                        <Input
                            placeholder="Email"
                            onChangeText={value => emailRef.current = value}
                        />
                        <Input
                            placeholder='Mot de passe'
                            secureTextEntry
                            onChangeText={value => passwordRef.current = value}
                        />
                        <Text style={styles.forgotPassword}>
                            Mot de passe oublié ?
                        </Text>
                        {/* button login */}
                        <Button title='Login' loading={loading} onPress={onSubmit} />
                    </View>
                    {/* footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Tu n'as pas de compte ?
                        </Text>
                        <Pressable onPress={() => router.push('signUp')}>
                            <Text style={[styles.footerText, { color: theme.colors.orange, fontWeight: theme.fonts.semibold }]}>Inscrit toi ici !</Text>
                        </Pressable>
                    </View>
                </View>
            </ScreenWrapper>
        </ImageBackground>
    )
}

export default Login

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
        marginBottom: 5, // Réduisez cette valeur pour diminuer l'espace en dessous du BackButton
    }
})