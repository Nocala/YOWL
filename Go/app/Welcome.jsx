 import { StyleSheet, View, Text, Image, Pressable} from 'react-native'
 import  React  from 'react'
import ScreenWrapper from '../components/SreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
 
 const Welcome = () => {
    const router =useRouter(); 
     return (
         <ScreenWrapper bg={theme.colors.whiteorange}>
             <StatusBar style="dark" />
             <View style={styles.container}>
                {/* welcome image */}
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/LogoGo.png')} />
                {/* title */}
                <View style={{gap: 20}}>
                    <Text style={styles.title}>BIENVENUE SUR GO.</Text>
                    <Text style={styles.punchline}>
                        <Text style={styles.create}>Create. </Text>
                        <Text style={styles.train}>Train. </Text>
                        <Text style={styles.inspire}>Inspire.</Text>
                    </Text>
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Button
                        title='Je commence'
                        buttonStyle={{marginHorizontal: wp(3)}}
                        onPress={()=> router.push('signUp')}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                            J'ai déjà un compte !
                        </Text>
                        <Pressable onPress={()=> router.push('login')}>
                            <Text style={[styles.loginText, {color: theme.colors.orange, fontWeight: theme.fonts.semibold}]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
             </View>
         </ScreenWrapper>
     )
 }
 
 export default Welcome

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:  'space-around',
        backgroundColor:  theme.colors.whiteorange,
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp (30),
        width: wp(100),
        alignSelf: 'center',
    },
    title: {
        color: theme.colors.blueDark,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extrabold
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(3),
        color: theme.colors.text,
        fontWeight: theme.fonts.bold
    },
    footer: {
        gap: 30,
        width: '100%',
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(2),
    },
    create: {
        color: theme.colors.blueDark,
    },
    train: {
        color: theme.colors.orange,
    },
    inspire: {
        color: theme.colors.blueLight,
    },
 })
