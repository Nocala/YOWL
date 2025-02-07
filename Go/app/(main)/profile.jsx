import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const profile = () => {
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
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.photo_profil }} style={styles.profileImage} />
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.stats}>Abonnés: {userData.nb_abonnes}</Text>
            <Text style={styles.stats}>Abonnements: {userData.nb_abonnements}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Modifier Profil" onPress={() => {}} color={theme.colors.primary} />
            <Button title="Partager Profil" onPress={() => {}} color={theme.colors.primary} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Textes" onPress={() => {}} color={theme.colors.primary} />
            <Button title="Médias" onPress={() => {}} color={theme.colors.primary} />
          </View>
        </View>
        <View style={styles.postsContainer}>
          {/* Ici, vous pouvez ajouter le code pour afficher les posts de l'utilisateur */}
          <Text>Posts de l'utilisateur</Text>
        </View>
      </ScrollView>
      <Footer />
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: theme.colors.whiteorange,
    marginTop: 10, // Adjust this value to control the spacing from the header
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  username: {
    fontSize: 20,
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
    marginBottom: 5
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.textLight,
    marginBottom: 10
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20
  },
  stats: {
    fontSize: 16,
    color: theme.colors.text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10
  },
  postsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.whiteorange
  }
})