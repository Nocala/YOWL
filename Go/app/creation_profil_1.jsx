import { Image, ImageBackground, PixelRatio, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Icon from '../assets/icons/Index';

const création_profil_1 = ({size=60}) => {
    const router = useRouter();
  return (
    <ImageBackground source={require('../assets/images/background_login.png')}
        style={styles.background}>
      <ScreenWrapper>
         <StatusBar style='dark' />
          <View style={styles.container}>
              <BackButton router={router}/>
              {/* Logo */}
              <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/LogoGo.png')} />
              {/* Avatar */}
              <View style={styles.circle}>
                <Icon name="plus" strokeWidth={2.5} size={size} color={theme.colors.orange} />
              </View>
          </View>
      </ScreenWrapper>
    </ImageBackground>
  )
}

export default création_profil_1

const styles = StyleSheet.create({
      background: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
    },
      logo: {
        height: hp (15),
        width: wp(70),
        alignSelf: 'center',
    },
      container: {
        flex: 1,
        gap: 20,
        padding: wp(5),
        backgroundColor: theme.colors.whiteorange,
        borderRadius: theme.radius.xxl,
        alignItems: 'center',
  
    },
      circle: {
        height: 100,
        width: 100,
        borderRadius: 200 / PixelRatio.get(),
        backgroundColor: theme.colors.whiteorange,
        borderColor: theme.colors.blueDark,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
      welcomText:{
          fontSize: hp(4),
          fontWeight: theme.fonts.bold,
          color: theme.colors.orange
    },
})