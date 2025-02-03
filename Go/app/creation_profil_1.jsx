import { Image, ImageBackground, PixelRatio, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Icon from '../assets/icons/Index';
import Button from '../components/Button';

const création_profil_1 = ({size=60}) => {
    const router = useRouter();
    const [sports, setSports] = useState([]);

    useEffect(() => {
      const fetchSports = async () => {
        try {
          const response = await fetch('http://16.171.155.129:3000/sports');
          const data = await response.json();
          if (response.ok) {
            console.log('Sports fetched successfully:', data);
            setSports(data);
          } else {
            console.error('Failed to fetch sports:', data);
            setSports([]);
          }
        } catch (error) {
          console.error('Error fetching sports:', error);
          setSports([]);
        }
      };
  
      fetchSports();
    }, []);
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
              <Text style={styles.TitleText}>
                Choisis ta photo de profil :
              </Text>
              <View style={styles.circle}>
                <Icon name="plus" strokeWidth={2.5} size={size} color={theme.colors.orange} />
              </View>
              {/* Sport pratiqué */}
              <Text style={styles.TitleText}>
                Sélectionne les sports que tu pratique : 
              </Text>
              <View style={styles.containerSports}>
                {sports.map((sport) => (
                  <View key={sport.id_sport} style={styles.buttonSports}>
                    <Text style={styles.TextSport}>{sport.name}</Text>
                  </View>
                ))}
              </View>
              <Button title='Suivant' />
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
      TitleText:{
        fontSize: hp(2),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.orange
    },
    containerSports:{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 7.5

    },
     buttonSports:{
      backgroundColor: theme.colors.whiteorange,
      borderColor: theme.colors.blueDark,
      borderWidth: 1,
      borderRadius: theme.radius.xxl,
      padding: 7.5,
      paddingLeft: 14,
      paddingRight: 14,
    },
     TextSport:{
      color: theme.colors.orange,
      fontSize: 15
     }
})