import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '../../components/SreenWrapper'
import { theme } from '../../constants/theme'
import BackButton from '../../components/BackButton'
import { useRouter } from 'expo-router'
import { Video } from 'expo-av';
import { wp } from '../../helpers/common'

const confidentialité = ({size=40}) => {
  const router=useRouter();
  const videoRef = useRef(null);
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <BackButton router={router} size={size}/>
      <View style={styles.container}> 
        <View style={styles.containerconfidentialité}>
          <Text style={styles.text}>Voici la vidéo de présentation du processus de la récupération des données de notre application Go.</Text>
          <Video 
            source={require('../../assets/images/Privacy By Design TF1 - Go. 2.mp4')}
            ref={videoRef}
            style={styles.backgroundVideo}
            useNativeControls
            resizeMode="contain"
            isLooping/>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default confidentialité

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: wp(5),
    backgroundColor: theme.colors.whiteorange,
    borderRadius: theme.radius.xxl,
    flexDirection: 'column',
  },
  text: {
    color: theme.colors.blueDark,
    fontSize: 25,
  },
  containerconfidentialité: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  backgroundVideo: {
    width: '100%',
    height: 200,
  },
});