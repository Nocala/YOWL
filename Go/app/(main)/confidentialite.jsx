import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/SreenWrapper'
import { theme } from '../../constants/theme'
import BackButton from '../../components/BackButton'
import { useRouter } from 'expo-router'
import Video from 'react-native-video';

const confidentialité = () => {
  const router=useRouter();
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.container}> 
        <BackButton router={router}/>
        <View style={styles.containerconfidentialité}>
          <Text>AAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
          <Video 
            source={require('../../assets/images/Privacy By Design TF1 - Go. 2.mp4')}
            style={styles.backgroundVideo}
            resizeMode="cover"
            controls={true} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default confidentialité

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  containerConfidentialite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: 200,
  },
})