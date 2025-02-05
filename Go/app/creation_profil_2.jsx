import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/SreenWrapper';
import BackButton from '../components/BackButton';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import * as SecureStore from 'expo-secure-store'; // Ajout de l'import pour SecureStore

const creation_profil_2 = ({}) => {
  const router = useRouter();
  const [sports, setSports] = useState([]);
  const [selectedSports, setSelectedSports] = useState({});
  const [userId, setUserId] = useState(null);

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

    const fetchUsername = async () => {
      const storedUsername = await SecureStore.getItemAsync('username');
      if (storedUsername) {
        setUserId(storedUsername);
        console.log('Username récupéré depuis SecureStore:', storedUsername);
      }
    };
    fetchUsername();
    
  }, []);

  const handlePress = (id_sport) => {
    setSelectedSports((prevSelectedSports) => ({
      ...prevSelectedSports,
      [id_sport]: !prevSelectedSports[id_sport],
    }));
  };

  const handleSubmit = async () => {
    const sportsArray = Object.keys(selectedSports).filter((id) => selectedSports[id]);
  
    if (sportsArray.length === 0) {
      alert("Veuillez sélectionner au moins un sport.");
      return;
    }
  
    // Transformation des IDs en noms de sports
    const sportsNames = sportsArray.map(id => {
      const sport = sports.find(sport => sport.id_sport === parseInt(id));
      return sport ? sport.name : null;
    });
  
    const formData = {
      username: userId, // Utilisation de la valeur récupérée du SecureStore
      sports_suivis: sportsNames, // Envoi des noms des sports suivis
    };
  
    console.log("Username envoyé à l'API:", userId); // Debug ici pour vérifier la valeur
  
    if (!userId) {
      alert("Le username n'a pas été récupéré. Assurez-vous qu'il est stocké correctement.");
      return;
    }

    try {
      const response = await fetch('http://16.171.155.129:3000/profil-2-2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Réponse de l'API:", data);
  
      if (response.ok) {
        router.push('home');
      } else {
        alert(data.error || "Erreur lors de la mise à jour du profil.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/background_login.png')} style={styles.background}>
      <ScreenWrapper>
        <StatusBar style='dark' />
        <View style={styles.container}>
          <BackButton router={router} />
          {/* Logo */}
          <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/LogoGo.png')} />
          <Text style={styles.TitleText}>
            Sélectionne les sports que tu veux suivre : 
          </Text>
          <ScrollView contentContainerStyle={styles.containerSports} showsVerticalScrollIndicator={false}>
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport.id_sport}
                style={[
                  styles.buttonSports,
                  selectedSports[sport.id_sport] && styles.buttonSportsSelected,
                ]}
                onPress={() => handlePress(sport.id_sport)}
              >
                <Text style={[styles.TextSport, selectedSports[sport.id_sport] && styles.textSportsSelected]}>
                  {sport.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title='Suivant' onPress={handleSubmit} />
        </View>
      </ScreenWrapper>
    </ImageBackground>
  );
}

export default creation_profil_2;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    height: hp(15),
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
    width: wp(80),
    maxHeight: '85%',
  },
  TitleText: {
    fontSize: hp(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.orange,
  },
  containerSports: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 7.5,
  },
  buttonSports: {
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    padding: 7.5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  buttonSportsSelected: {
    backgroundColor: theme.colors.orange,
  },
  TextSport: {
    color: theme.colors.orange,
    fontSize: 15,
  },
  textSportsSelected: {
    color: 'white',
  },
});