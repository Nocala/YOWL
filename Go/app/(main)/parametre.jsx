import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/SreenWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchIcon from '../../assets/icons/Search'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons/Index'
import { useRouter } from 'expo-router'

const parametre = ({size=40}) => {
    const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
        <Header />
      <ScrollView>
            <View style={styles.searchContainer}>
                <SearchIcon strokeWidth={1.5} color={theme.colors.textDark} />
                <TextInput style={styles.searchBar} placeholder="Search..." />
            </View>
            <View>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Archives</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Notifications</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Type de compte</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Autorisations</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
                <TouchableOpacity style={styles.containerparametre} onPress={() => router.push('confidentialite')}>
                    <Text style={styles.textparametre}>Confidentialité</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </TouchableOpacity>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Se déconnecter</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
                <View style={styles.containerparametre}>
                    <Text style={styles.textparametre}>Supprimer compte</Text>
                    <Icon name="arrowright" size={size} style={styles.icon}/>
                </View>
            </View>
      </ScrollView>
      <Footer />
    </ScreenWrapper>
  )
}

export default parametre

const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
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
        marginLeft: 30,
        marginRight: 30,
        marginTop: 16
    },
    containerparametre: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textparametre:{
        fontSize: 30,
        color: theme.colors.blueDark
    },
    icon: {
        color: theme.colors.orange,
    }
})