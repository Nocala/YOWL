import { StyleSheet, Text, View, TextInput, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { theme } from '../../constants/theme'
import BackButton from '../../components/BackButton'
import Footer from '../../components/Footer'
import ScreenWrapper from '../../components/SreenWrapper'

const messages = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://16.171.155.129:3000/users');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchProfiles();
  }, []);

  const getRandomStyle = () => {
    return Math.random() < 0.5 ? styles.profile : styles.profile_no_msg;
  };

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => router.push('/home')} />
          <Text style={styles.title}>Messages</Text>
        </View>

        <TextInput style={styles.searchBar} placeholder="Rechercher..." />

        <FlatList
          data={profiles}
          keyExtractor={(item, index) => `${item.username}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.profileContainer}>
              {item.photo_profil && (
                <Image
                  source={{ uri: `http://16.171.155.129:3000/media/id/${item.photo_profil}` }}
                  style={styles.profileImage}
                />
              )}
              <Text style={getRandomStyle()}>{item.username}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />

        <Footer />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteorange,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.whiteorange,
    borderBottomWidth: 0.2,
    borderBottomColor: theme.colors.gray,
  },
  title: {
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    marginLeft: 16,
    color: theme.colors.blueDark,
  },
  searchBar: {
    height: 40,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 8,
    margin: 16,
  },
  list: {
    paddingBottom: 80,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  profile: {
    color: theme.colors.orange,
    fontSize: 16,
    fontWeight: theme.fonts.bold,
    marginLeft: 8,
  },
  profile_no_msg: {
    color: theme.colors.blueDark,
    fontSize: 16,
    fontWeight: theme.fonts.bold,
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})

export default messages;