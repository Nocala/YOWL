import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { theme } from '../../constants/theme'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScreenWrapper from '../../components/SreenWrapper'
import SearchIcon from '../../assets/icons/Search'
import Button from '../../components/Button'


const search = () => {
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Rechercher</Text>

        <View style={styles.searchContainer}>
          <SearchIcon strokeWidth={1.5} color={theme.colors.textDark} />
          <TextInput style={styles.searchBar} placeholder="Search..." />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Comptes" 
            onPress={() => {}} 
            buttonStyle={styles.filterButton} 
            textStyle={styles.filterButtonText} 
          />
          <Button 
            title="Events" 
            onPress={() => {}} 
            buttonStyle={styles.filterButton} 
            textStyle={styles.filterButtonText} 
          />
          <Button 
            title="Articles" 
            onPress={() => {}} 
            buttonStyle={styles.filterButton} 
            textStyle={styles.filterButtonText} 
          />
        </View>
      </ScrollView>
      <Footer />
    </ScreenWrapper>
  )
}

export default search

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    alignSelf: 'flex-start', 
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    color: theme.colors.orange,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.whiteorange,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.orange,
    borderWidth: 1,
    height: 36, // Reduced height

  },
  filterButtonText: {
    color: theme.colors.orange,
    paddingHorizontal: 16,
    fontSize: 15,
  },
})