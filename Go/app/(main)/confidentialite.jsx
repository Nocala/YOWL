import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Video } from 'expo-av';
import { wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import BackButton from '../../components/BackButton'
import Footer from '../../components/Footer' // Import the Footer component

const confidentialité = ({size=40}) => {
  const router=useRouter();
  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.stopAsync();
      }
    };
  }, []);

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.headerRow}>
          <BackButton onPress={() => router.push('/parametre')} />

          <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Confidentialité</Text>
          </View>
      </View>

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

      <Footer /> {/* Add the Footer component */}
    </ScreenWrapper>
  )
}

export default confidentialité

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
    headerTextContainer: {
    flex: 1,
    alignItems: 'left',
  },
    headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.orange,
  },
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
    fontSize: 23,
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