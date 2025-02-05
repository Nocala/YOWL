import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/SreenWrapper';
import BackButton from '../../components/BackButton';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { wp } from '../../helpers/common';
import Icon from '../../assets/icons/Index';

const defaultProfileImage = require('../../assets/images/profile-defaut.jpeg');
const CreationPost = (size=24) => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(null);
  const [postText, setPostText] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePress = (button) => {
    setSelectedButton(button);
  };

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScreenWrapper bg={theme.colors.whiteorange}>
          <Header />
          <BackButton router={router} />
          <View style={styles.container}>
            <View style={styles.containerbutton}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'button1' && styles.buttonSelected,
                ]}
                onPress={() => handlePress('button1')}
              >
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
                <View style={styles.contentButton1}>
                  <View style={styles.inputpost}>
                    <ScrollView>
                      <TextInput
                        style={styles.input}
                        placeholder="Écrivez votre post ici..."
                        value={postText}
                        onChangeText={setPostText}
                        multiline
                      />
                    </ScrollView>
                  </View>
                  <View style={styles.inputpost}>
                    <ScrollView>
                      <TextInput
                        style={styles.inputdescription}
                        placeholder="Description de votre post ici ..."
                        value={postDescription}
                        onChangeText={setPostDescription}
                        multiline
                      />
                    </ScrollView>
                  </View>
                  <Button title="Post" buttonStyle={{ paddingLeft: wp(10), paddingRight: wp(10) }} onPress={() => console.log('Post Text:', postText)} />
                </View>
              )}
              {selectedButton === 'button2' && (
                <View style={styles.contentButton2}>
                  <View style={styles.inputImage}>
                    <ScrollView>
                        <TouchableOpacity style={styles.circle} onPress={pickImage}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
                            ) : (
                                <Icon name="plus"/>
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
                        multiline
                      />
                    </ScrollView>
                  </View>
                  <Button title="Post" buttonStyle={{ paddingLeft: wp(10), paddingRight: wp(10) }} onPress={() => console.log('Post Média')} />
                </View>
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
  contentButton1: {
    backgroundColor: theme.colors.whiteorange,
    padding: 20,
    gap: 20,
    width: "100%",
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    borderColor: theme.colors.blueDark ,
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
    borderColor: theme.colors.blueDark ,
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
    padding: 20,
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
    height: "30%", 
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
    borderRadius: 100,
  },
  inputImage: {
    width: "100%",
    alignItems:"center"
  }
});