import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { theme } from '../../constants/theme'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import ScreenWrapper from '../../components/SreenWrapper'

const defaultProfileImage = require('../../assets/images/image par defaut.png');

const creation_event = () => {
  const router = useRouter();

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [sport, setSport] = useState('')
  const [gender, setGender] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);

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
        alert("Hop hop hop ! Seuls les formats JPEG et PNG sont autorisés. ⚠️");
      }
    }
  };

  const validateFields = () => {
    return name && date && location && sport && gender && maxParticipants && description && selectedImage;
  }

  const handleSubmit = async () => {
    if (!validateFields()) {
      Alert.alert('Hop hop hop !', 'Remplis tous les champs pour créer un évènement ⌨️');
      return;
    }

    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      Alert.alert('Attention !', 'Tu n\'es pas connecté 🚫');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('lieu', location);
    formData.append('sport', sport);
    formData.append('genre', gender);
    formData.append('nb_participants_max', maxParticipants);
    formData.append('description', description);
    formData.append('file', {
      uri: selectedImage.uri,
      name: 'event_image.jpg',
      type: 'image/jpeg'
    });

    try {
      const response = await fetch('http://16.171.155.129:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Et voilà !', 'Évènement créé avec succès 🎉');
        router.push('/events');
      } else {
        Alert.alert('Oula...', data.error || 'Tu n\'as pas réussi à créer un évènement 😔');
      }
    } catch (error) {
      Alert.alert('Oula...', 'Une erreur est survenue lors de la création de l\'évènement 😔');
    }
  }

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <BackButton onPress={() => router.push('/events')} />

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Créer mon évènement</Text>
          </View>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.form}>

            <Text style={styles.label}>Nom de l'évènement</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Sport</Text>
            <TextInput style={styles.input} value={sport} onChangeText={setSport} />

            <TouchableOpacity style={styles.square} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
              ) : (
                <Image source={defaultProfileImage} style={styles.profileImage} />
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

            <View style={styles.row}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Genre</Text>
                <TextInput style={styles.input} value={gender} onChangeText={setGender} />
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Lieu</Text>
                <TextInput style={styles.input} value={location} onChangeText={setLocation} />
              </View>
            </View>

            <Text style={styles.label}>Nombre max de participants</Text>
            <TextInput style={styles.input} value={maxParticipants} onChangeText={setMaxParticipants} keyboardType="numeric" />

            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder='Au format AAAA/MM/JJ' />

            <Button textStyle={styles.button} title="Créer évènement" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </ScreenWrapper>
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
    paddingBottom: 100,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.orange,
  },
  formWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.textDark,
    fontWeight: theme.fonts.semibold,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.whiteorange,
    width: '100%',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInputContainer: {
    width: '48%',
  },
  button: {
    paddingHorizontal: 16,
  },
});