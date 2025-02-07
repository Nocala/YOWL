import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from '../../assets/icons/Index'
import { router } from 'expo-router'

const profile = ({size=30}) => {
  // Données fictives pour le template
  const userData = {
    username: 'JohnDoe',
    nb_abonnes: 120,
    nb_abonnements: 150,
    photo_profil: 'https://example.com/photo.jpg',
    bio: 'This is a sample bio'
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
            <Image source={{ uri: userData.photo_profil }} style={styles.profileImage} />
            <Icon name="settings" size={size} color={theme.colors.blueDark} onPress={() => router.push('parametre')}/>
          </View>
          <View style={styles.containerbio}>
            <Text style={styles.bio}>Bio</Text>
            <Text style={styles.textnormal}>{userData.bio}
            </Text>
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
    flex:1
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
    borderColor: theme.colors.blueDark,
    borderWidth: 1
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