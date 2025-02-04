import { 
  Image, 
  ImageBackground, 
  PixelRatio, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Icon from '../assets/icons/Index';
import Button from '../components/Button';

const creation_profil_1 = ({ size = 60 }) => {
  const router = useRouter();
  const [sports, setSports] = useState([]);
  const [selectedSports, setSelectedSports] = useState({});
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await SecureStore.getItemAsync('username');
      if (storedUsername) {
        setUserId(storedUsername);
        console.log('Username récupéré depuis SecureStore:', storedUsername);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch('http://16.171.155.129:3000/sports');
        const data = await response.json();
        if (response.ok) {
          setSports(data);
        } else {
          console.error('Failed to fetch sports:', data);
        }
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };
    fetchSports();
  }, []);

  const handlePress = (id_sport) => {
    setSelectedSports((prev) => ({
      ...prev,
      [id_sport]: !prev[id_sport],
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log("Image sélectionnée :", result.assets[0]);

    if (!result.canceled) {
      const file = result.assets[0];
      if (['image/jpeg', 'image/png'].includes(file.mimeType)) {
        setSelectedImage(file);
      } else {
        alert("Seuls les formats JPEG et PNG sont autorisés.");
      }
    }
  };

  const handleSubmit = async () => {
    console.log("=== DEBUG AVANT ENVOI ===");
    console.log("User ID:", userId);
    console.log("Image sélectionnée:", selectedImage ? selectedImage.uri : "Aucune image");
    console.log("Sports sélectionnés:", Object.keys(selectedSports).filter((id) => selectedSports[id]));
    if (!userId) {
      alert("Erreur : Username introuvable.");
      return;
    }
    if (!selectedImage) {
      alert("Veuillez sélectionner une image.");
      return;
    }

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

    const formData = new FormData();
    formData.append("username", userId);
    formData.append("sports_pratiques", JSON.stringify(sportsNames)); // Envoi des noms au lieu des IDs
    formData.append("photo_profil", {
      uri: selectedImage.uri,
      type: selectedImage.mimeType,
      name: `profile_${userId}.${selectedImage.uri.split('.').pop()}`
    });
    console.log("Données envoyées :", JSON.stringify({
      username: userId,
      sports_pratiques: sportsNames, // Affichage des noms ici aussi
    }));

    try {
      console.log("Envoi des données à l'API...");
    
      const response = await fetch('http://16.171.155.129:3000/profil-1-2', {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
      console.log("Réponse de l'API depuis l'appli:", data);
    
      if (response.ok) {
        //alert("Profil créé avec succès !");
        console.log("Navigation vers creation_profil_2...");
        router.push('creation_profil_2');
      } else {
        alert(data.error || "Erreur lors de la création du profil.");
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
          <ScrollView contentContainerStyle={styles.scrollcontainer}>
            <BackButton router={router} />

            <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/LogoGo.png')} />

            <Text style={styles.TitleText}>Choisis ta photo de profil :</Text>
            <TouchableOpacity style={styles.circle} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
              ) : (
                <Icon name="plus" strokeWidth={2.5} size={size} color={theme.colors.orange} />
              )}
            </TouchableOpacity>

            <Text style={styles.TitleText}>Sélectionne les sports que tu pratiques :</Text>
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
                  <Text
                    style={[
                      styles.TextSport,
                      selectedSports[sport.id_sport] && styles.textSportsSelected,
                    ]}
                  >
                    {sport.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Button title="Suivant" onPress={handleSubmit} />
        </View>
      </ScreenWrapper>
    </ImageBackground>
  );
};

export default creation_profil_1;

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
    gap: 10,
    padding: wp(5),
    backgroundColor: theme.colors.whiteorange,
    borderRadius: theme.radius.xxl,
    alignItems: 'center',
    maxHeight: '80%',
    width: wp(80),
  },
  scrollcontainer: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  TitleText: {
    fontSize: hp(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.orange,
  },
  containerSports: {
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
  TextSport: {
    color: theme.colors.orange,
    fontSize: 15,
  },
  buttonSportsSelected: {
    backgroundColor: theme.colors.orange,
  },
  textSportsSelected: {
    color: 'white',
  },
});