import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/SreenWrapper'
import { theme } from '../../constants/theme'
import Footer from '../../components/Footer'
import Icon from '../../assets/icons/Index'

const defaultProfileImage = require('../../assets/images/profile-defaut.jpeg');
const profile = ({size=30}) => {
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.container}>
        <View style={styles.containerinfoprofil}>
          <View style={styles.containerinfoprimaire}>
            <View style={styles.firstblock}>
              <Text style={styles.username}>Username</Text>
              <View style={styles.containersuivieandfollowers}>
                <View style={styles.suivie}>
                  <Text style={styles.nombresuivie}>190</Text>
                  <Text style={styles.textnormal}>Suivies</Text>
                </View>
                <View style={styles.followers}>
                  <Text style={styles.nombrefollowers}>125</Text>
                  <Text style={styles.textnormal}>Followers</Text>
                </View>
              </View>
            </View>
            <Image source={defaultProfileImage} style={styles.profileImage} />
            <Icon name="settings" size={size} color={theme.colors.blueDark}/>
          </View>
          <View style={styles.containerbio}>
            <Text style={styles.bio}>Bio</Text>
            <Text style={styles.textnormal}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel enim nulla. Mauris posuere mauris et facilisis posuere. Praesent sagittis mauris a lacinia iaculis. Duis ut mi suscipit, venenatis ligula bibendum, blandit erat.
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
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {

  },
  containerinfoprofil: {

  },
  containerinfoprimaire: {

  },
  firstblock: {

  },
  username: {
    color: theme.colors.blueDark,
    fontSize: 37
  },
  containersuivieandfollowers: {

  },
  suivie: {
    
  },
  nombresuivie: {
    color: theme.colors.blueLight,
    fontSize: 27
  },
  textnormal: {
    color: theme.colors.blueDark,
    fontSize: 17,
  },
  followers: {

  },
  nombrefollowers: {
    color: theme.colors.orange,
    fontSize: 27
  },
  profileImage: {
    borderColor: theme.colors.blueDark,
    borderWidth: 1
  },
  containerbio: {

  },
  bio: {
    color: theme.colors.orange,
    fontSize: 17,
  },
  containerbouttonpartage: {

  },
  button: {
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: "center"
  },
  textbutton: {
    color: theme.colors.orange,
    fontSize: 13,
  }
})