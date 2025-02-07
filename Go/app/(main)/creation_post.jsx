import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Alert, } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Button from '../../components/Button'


const CreationPost = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(null);
  const [postText, setPostText] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Désolé, nous avons besoin des permissions de la bibliothèque pour que cela fonctionne!');
      }
    })();
  }, []);

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setSelectedImage(file);
    }
  };

  const handleSubmitTextPost = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch('http://16.171.155.129:3000/posts-txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: postText,
          description: postDescription,
        }),
      });

      if (response.ok) {
        Alert.alert('C\'est ok !', 'Ton post a été créé 👍', [
          {
            text: 'OK',
            onPress: () => router.push('/home')
          }
        ]);
      } else {
        alert('Erreur lors de la création du post textuel');
      }
    } catch (error) {
      console.error('Erreur lors de la création du post textuel:', error);
      alert('Erreur lors de la création du post textuel');
    }
  };

  const handleSubmitMediaPost = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });
    formData.append('description', postDescription);

    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch('http://16.171.155.129:3000/posts-media', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('C\'est ok !', 'Ton post a été créé 👍', [
          {
            text: 'OK',
            onPress: () => router.push('/home')
          }
        ]);
      } else {
        alert('Erreur lors de la création du post média');
      }
    } catch (error) {
      console.error('Erreur lors de la création du post média:', error);
      alert('Erreur lors de la création du post média');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScreenWrapper bg={theme.colors.whiteorange}>
          <Header />

          <View style={styles.headerRow}>

            <BackButton onPress={() => router.push('/home')} />

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Créer un post</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.containerbutton}>
              <TouchableOpacity
                style={[styles.button, selectedButton === 'button1' && styles.buttonSelected]}
                onPress={() => handlePress('button1')}>

                <Text style={[styles.buttonText, selectedButton === 'button1' && styles.textSelected]}>Text</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'button2' && styles.buttonSelected,
                ]}
                onPress={() => handlePress('button2')}
              >
                <Text style={[styles.buttonText, selectedButton === 'button2' && styles.textSelected]}>Image/Vidéo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {selectedButton === 'button1' && (
                <ScrollView style={styles.scrollView}>
                  <View style={styles.contentButton1}>
                    <View style={styles.inputpost}>
                      <ScrollView>
                        <TextInput
                          style={styles.input}
                          placeholder="Écrivez votre post ici..."
                          value={postText}
                          onChangeText={setPostText}
                          multiline />
                      </ScrollView>
                    </View>

                    <View style={styles.inputpost}>
                      <ScrollView>
                        <TextInput
                          style={styles.inputdescription}
                          placeholder="Description de votre post ici ..."
                          value={postDescription}
                          onChangeText={setPostDescription}
                          multiline />
                      </ScrollView>
                    </View>

                    <Button title="Post" buttonStyle={{ paddingLeft: wp(10), paddingRight: wp(10) }} onPress={handleSubmitTextPost} />
                  </View>
                </ScrollView>
              )}

              {selectedButton === 'button2' && (
                <ScrollView style={styles.scrollView}>
                  <View style={styles.contentButton2}>
                    <View style={styles.inputImage}>
                      <ScrollView>
                        <TouchableOpacity style={styles.circle} onPress={pickImage}>
                          {selectedImage ? (
                            <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
                          ) : (
                            <Image source={require('../../assets/images/image par defaut.png')} style={styles.imagedefaut} />
                          )}
                        </TouchableOpacity>
                      </ScrollView>
                    </View>

                    <View style={styles.inputpost}>
                      <ScrollView>
                        <TextInput
                          style={styles.inputdescription}
                          placeholder="Description de votre post ici ..."
                          value={postDescription}
                          onChangeText={setPostDescription}
                          multiline />
                      </ScrollView>
                    </View>

                    <Button title="Post" buttonStyle={{ paddingLeft: wp(10), paddingRight: wp(10) }} onPress={handleSubmitMediaPost} />
                  </View>
                </ScrollView>
              )}

            </View>
          </View>
          <Footer />
        </ScreenWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreationPost;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.orange,
  },
  contentButton1: {
    backgroundColor: theme.colors.whiteorange,
    padding: 20,
    gap: 20,
    width: "100%",
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    borderColor: theme.colors.blueDark,
    alignItems: 'center',
  },
  inputpost: {
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    width: "100%",
  },
  contentButton2: {
    backgroundColor: theme.colors.whiteorange,
    padding: 20,
    gap: 20,
    width: "100%",
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    borderColor: theme.colors.blueDark,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerbutton: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    margin: 10,
    width: '40%',
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: theme.colors.orange,
    borderWidth: 0,
  },
  textSelected: {
    color: theme.colors.whiteorange
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.blueDark,
  },
  content: {
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: "80%"
  },
  contentText: {
    fontSize: 18,
    color: theme.colors.blueDark,
  },
  input: {
    height: 75,
    padding: 10,
  },
  inputdescription: {
    height: 200,
    padding: 10,
  },
  circle: {
    height: 200,
    width: 200,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xl,
  },
  inputImage: {
    width: "100%",
    alignItems: "center"
  },
  imagedefaut: {
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    width: "100%",
    height: "100%"
  }
});