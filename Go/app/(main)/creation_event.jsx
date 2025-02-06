import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { theme } from '../../constants/theme'

const defaultProfileImage = require('../../assets/images/image par defaut.png');

const creation_event = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [sport, setSport] = useState('')
  const [gender, setGender] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState(null); // Image sélectionnée

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const file = result.assets[0];
        if (['image/jpeg', 'image/png'].includes(file.mimeType)) {
          setSelectedImage(file);
        } else {
          alert("Seuls les formats JPEG et PNG sont autorisés.");
        }
      }
    };

  const handleSubmit = () => {
    // Logic for form submission
  }

  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Sport</Text>
        <TextInput style={styles.input} value={sport} onChangeText={setSport} />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value={gender} onChangeText={setGender} />

        <Text style={styles.label}>Max Participants</Text>
        <TextInput style={styles.input} value={maxParticipants} onChangeText={setMaxParticipants} keyboardType="numeric" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

        <TouchableOpacity style={styles.square} onPress={pickImage}>
            {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
            ) : (
            <Image source={defaultProfileImage} style={styles.profileImage} />
            )}
        </TouchableOpacity>

        <Button title="Create Event" onPress={handleSubmit} color={theme.colors.primary} />
      </ScrollView>
      <Footer />
    </View>
  )
}

export default creation_event

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.whiteorange,
  },
  container: {
    padding: 20,
    paddingBottom: 100, // Ensure content is not hidden behind the footer
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.textDark,
    fontWeight: theme.fonts.semibold,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: 10,
    marginTop: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.whiteorange,
  },
  square: {
    marginTop: 15,
    marginBottom: 15,
    height: 200,
    width: 200,
    borderRadius: 10,
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: theme.radius.sm,
  },
})