import { Image, ImageBackground, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Icon from '../assets/icons/Index';
import Button from '../components/Button';
import * as SecureStore from 'expo-secure-store';

const création_profil_1 = ({size=60}) => {
    const router = useRouter();
    const [sports, setSports] = useState([]);
    const [selectedSports, setSelectedSports] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const fetchUserId = async () => {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          console.log('User ID in création_profil_1:', storedUserId);
        }
      };

      fetchUserId();
    }, []);

    useEffect(() => {
      const fetchSports = async () => {
        try {
          const response = await fetch('http://16.171.155.129:3000/sports', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
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

    const handlePress = (id_sport) => {
      setSelectedSports((prevSelectedSports) => ({
        ...prevSelectedSports,
        [id_sport]: !prevSelectedSports[id_sport],
      }));
    };
  return (
    <ImageBackground source={require('../assets/images/background_login.png')}
        style={styles.background}>
      <ScreenWrapper>
         <StatusBar style='dark' />
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollcontainer}>
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
                  <TouchableOpacity
                    key={sport.id_sport}
                    style={[
                      styles.buttonSports,
                      selectedSports[sport.id_sport] && styles.buttonSportsSelected,
                    ]}
                    onPress={() => handlePress(sport.id_sport)}
                  >
                    <Text style={[styles.TextSport,
                      selectedSports[sport.id_sport] && styles.textSportsSelected,
                    ]}>{sport.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              </ScrollView>
              <Button title='Suivant' onPress={()=> router.push('creation_profil_2')}/>
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
        gap: 10,
        padding: wp(5),
        backgroundColor: theme.colors.whiteorange,
        borderRadius: theme.radius.xxl,
        alignItems: 'center',
        maxHeight: '80%',
        width: wp(80)
  
    },
    scrollcontainer:{
      flex: 1,
      gap: 20,
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
     },

     buttonSportsSelected:{
      backgroundColor: theme.colors.orange,
    },
    textSportsSelected:{
        color: 'white'
    },
})