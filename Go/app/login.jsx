import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/SreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Icon from '../assets/icons/Index'
import Button from '../components/Button'

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(true);

    const onSubmit = ()=>{

    }
  return (
    <ImageBackground source={require('../assets/images/background_login.png')}
    style={styles.background}>
        <ScreenWrapper>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <BackButton router={router}/>

                {/* Welcome */}
                <View>
                    <Text style={styles.welcomText}>Hey,</Text>
                    <Text style={styles.welcomText}>Welcome Back</Text>
                </View>

                {/* form */}
                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                        Please login to continue 
                    </Text>
                    <Input
                        placeholder= 'Enter your email'
                        onChangeText={value=> emailRef.current = value}
                    />
                    <Input
                        placeholder= 'Enter your password'
                        secureTextEntry
                        onChangeText={value=> emailRef.current = value}
                    />
                    <Text style={styles.forgotPassword}>
                        Forgot Password ?
                    </Text>
                    {/* button login */}
                    <Button title='Login' loading={loading} onPress={onSubmit} />
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Dont't have an account ?
                    </Text>
                    <Pressable>
                         <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomText:{
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
    },
    form: {
        gap: 25,
    },
    forgotPassword:{
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})