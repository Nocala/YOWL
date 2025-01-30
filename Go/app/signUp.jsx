import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const confirmationpasswordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = ()=>{
        if(!emailRef.current || !passwordRef.current){
            Alert.alert('Sign Up', "please fill all the fields!")
        }
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
                    <Text style={styles.welcomText}>Let's,</Text>
                    <Text style={styles.welcomText}>Get Started</Text>
                </View>

                {/* form */}
                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                        Please fill the details to create a new account 
                    </Text>
                    <Input
                        placeholder= "Nom d'utilisateur"
                        onChangeText={value=> usernameRef.current = value}
                    />
                    <Input
                        placeholder= 'Adresse email'
                        onChangeText={value=> emailRef.current = value}
                    />
                    <Input
                        placeholder= 'Mot de passe'
                        secureTextEntry
                        onChangeText={value=> passwordRef.current = value}
                    />
                    <Input
                        placeholder= 'Confirmation du mot de passe'
                        secureTextEntry
                        onChangeText={value=> confirmationpasswordRef.current = value}
                    />
                    {/* button login */}
                    <Button title='Sign Up' loading={loading} onPress={onSubmit} />
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account !
                    </Text>
                    <Pressable onPress={()=> router.push('login')}>
                         <Text style={[styles.footerText, {color: theme.colors.orange, fontWeight: theme.fonts.semibold}]}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    </ImageBackground>
  )
}

export default SignUp

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
      padding: wp(5),
      backgroundColor: theme.colors.whiteorange,
      borderRadius: theme.radius.xxl

  },
    welcomText:{
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.orange
    },
    form: {
        gap: 25,
    },
    forgotPassword:{
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.orange
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