import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import React from 'react'
import BackButton from '../../components/BackButton'
import Footer from '../../components/Footer'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import { useRouter } from 'expo-router'; // Assurez-vous d'importer depuis 'expo-router'


const messages = () => {
  const router = useRouter(); // Utilisez useRouter pour obtenir l'objet router
  const profiles = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    { id: '4', name: 'Bob Brown' },
  ]

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
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text style={styles.profile}>{item.name}</Text>}
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
    paddingBottom: 80, // To ensure the list doesn't overlap with the footer
  },
  profile: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    color: theme.colors.text,
  },
})

export default messages;