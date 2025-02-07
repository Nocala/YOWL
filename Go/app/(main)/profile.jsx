import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from '../../assets/icons/Index'
import { useRouter } from 'expo-router'

const profile = ({ size = 30 }) => {
  const [userData, setUserData] = useState(null);
  const [profileImageUri, setProfileImageUri] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data...');
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        Alert.alert('Attention !', 'Tu n\'es pas connecté 🚫');
        console.log('No token found');
        return;
      }

      console.log('Token found:', token);

      try {
        const response = await fetch('http://16.171.155.129:3000/profil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          setUserData(data);
          console.log('User data set:', data);

          // Fetch profile image
          if (data.photo_profil) {
            console.log('Fetching profile image with ID:', data.photo_profil);
            const imageResponse = await fetch(`http://16.171.155.129:3000/media/id/${data.photo_profil}`);
            const imageData = await imageResponse.json();
            console.log('Image data:', imageData);

            if (imageResponse.ok) {
              setProfileImageUri(imageData.filepath);
              console.log('Profile image URI set:', imageData.filepath);
            } else {
              console.log('Error fetching profile image:', imageData.error);
            }
          } else {
            console.log('No profile image ID found in user data');
          }
        } else {
          Alert.alert('Oula...', data.error || 'Impossible de récupérer les informations de l\'utilisateur 😔');
          console.log('Error fetching user data:', data.error);
        }
      } catch (error) {
        Alert.alert('Oula...', 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur 😔');
        console.log('Fetch error:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return null; // Ou un indicateur de chargement
  }

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.allcontainer}>
        <Header />

        <View style={styles.container}>
          <View style={styles.containerinfoprofil}>
            <View style={styles.containerinfoprimaire}>
              <View style={styles.firstblock}>
                <Text style={styles.username}>{userData.username}</Text>

                <View style={styles.containersuivieandfollowers}>
                  <View style={styles.suivie}>
                    <Text style={styles.nombresuivie}>{userData.nb_abonnements}</Text>
                    <Text style={styles.textnormal}>Abonnements</Text>
                  </View>

                  <View style={styles.followers}>
                    <Text style={styles.nombrefollowers}>{userData.nb_abonnes}</Text>
                    <Text style={styles.textnormal}>Abonnés</Text>
                  </View>
                </View>
              </View>

              {profileImageUri ? (
                <Image source={{ uri: `http://16.171.155.129:3000${profileImageUri}` }} style={styles.profileImage} />
              ) : (
                <Text style={styles.noImageText}>Pas d'image de profil</Text>
              )}

              <Icon name="settings" size={size} color={theme.colors.blueDark} onPress={() => router.push('parametre')} />
            </View>

            <View style={styles.containerbio}>
              <Text style={styles.bio}>Bio</Text>
              <Text style={styles.textnormal}>{userData.bio}</Text>
            </View>

            <View style={styles.containerbouttonpartage}>
              <TouchableOpacity style={styles.boutton}>
                <Text style={styles.textbutton}>Modifie ton profil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.boutton}>
                <Text style={styles.textbutton}>Partage ton profil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {/* Ici, vous pouvez ajouter le code pour afficher les posts de l'utilisateur */}
            <Text>Posts de l'utilisateur</Text>
          </ScrollView>
        </View>

        <Footer />
      </View>
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    margin: 10,
    height: "80%"
  },
  containerinfoprofil: {
    display: "flex",
    gap: 15
  },
  containerinfoprimaire: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  firstblock: {
    gap: 10
  },
  username: {
    color: theme.colors.blueDark,
    fontSize: 37,
    fontWeight: theme.fonts.bold
  },
  containersuivieandfollowers: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end"
  },
  nombresuivie: {
    color: theme.colors.blueLight,
    fontSize: 27
  },
  textnormal: {
    color: theme.colors.blueDark,
    fontSize: 17,
  },
  nombrefollowers: {
    color: theme.colors.orange,
    fontSize: 27
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: theme.colors.blueDark,
    borderWidth: 1
  },
  noImageText: {
    color: theme.colors.textLight,
    fontSize: 16,
    textAlign: 'center'
  },
  bio: {
    color: theme.colors.orange,
    fontSize: 17,
    fontWeight: theme.fonts.bold
  },
  containerbouttonpartage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30
  },
  boutton: {
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: theme.radius.xl,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingLeft: 7.5,
    paddingRight: 7.5
  },
  textbutton: {
    color: theme.colors.orange,
    fontSize: 13,
    fontWeight: theme.fonts.semibold
  }
})