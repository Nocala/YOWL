import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import * as SecureStore from 'expo-secure-store'

const Event = ({ name, date, lieu, sport, genre, description, id_media, eventId, token }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [participantsData, setParticipantsData] = useState({ participants: 0, maxParticipants: 0 });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (id_media) {
      setImageUrl(`http://16.171.155.129:3000/media/id/${id_media}`);
    }
  }, [id_media]);

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        const response = await fetch(`http://16.171.155.129:3000/events/${eventId}/participants/count`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setParticipantsData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des participants:', error);
      }
    };

    if (eventId) {
      fetchParticipantsData();
    }
  }, [eventId, refresh]);

  const handleParticipation = async () => {
    console.log("handleParticipation appelé !");
    try {
      const token = await SecureStore.getItemAsync('authToken');
      console.log("Token récupéré :", token);

      if (!token) {
        Alert.alert(
          'Attention',
          'Tu dois d\'abord te connecter pour participer à un événement.',
          [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]
        );
        return;
      }

      Alert.alert(
        'Confirmation',
        'Tu veux vraiment participer à cet événement ?',
        [
          { text: 'En fait non', style: 'cancel' },
          {
            text: 'Oui !',
            onPress: async () => {
              try {
                console.log(`Envoi de la requête avec token: ${token}`);
                const response = await fetch(`http://16.171.155.129:3000/events/${eventId}/participants`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });

                const result = await response.json();
                console.log("Réponse API:", result);

                if (!response.ok) {
                  Alert.alert('Oups...', result.error || 'Une erreur est survenue.');
                  return;
                }

                Alert.alert('C\'est bon !', 'Tu es inscrit à cet événement !', [
                  { text: 'OK', onPress: () => setRefresh(!refresh) }
                ]);
              } catch (error) {
                console.error('Erreur lors de l\'inscription:', error);
                Alert.alert('Oups...', 'Impossible de s\'inscrire pour le moment.');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      Alert.alert('Oups...', 'Impossible de récupérer tes informations de connexion.');
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('fr-FR');

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventName}>{name}</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.eventImage} />}
      <Text style={styles.eventSport}>{sport}</Text>
      <Text style={styles.eventDesc}>Description : {description}</Text>
      <Text style={styles.eventDate}>Le {formattedDate}</Text>
      <Text style={styles.eventLieu}>Où ? {lieu}</Text>
      <Text style={styles.eventGenre}>Genre : <Text style={styles.variable}>{genre}</Text></Text>
      <Text style={styles.eventParticipants}>
        Participants : <Text style={styles.variable}>{participantsData.participants} / {participantsData.maxParticipants}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Je veux participer !"
          buttonStyle={styles.partButton}
          textStyle={styles.buttonText}
          onPress={() => {
            console.log("Bouton cliqué !");
            handleParticipation();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.whiteorange,
  },
  eventName: {
    fontSize: 18,
    fontWeight: theme.fonts.bold,
    color: theme.colors.orange,
  },
  eventSport: {
    fontSize: 18,
    fontWeight: theme.fonts.bold,
    color: theme.colors.orange,
    paddingTop: 10,
    paddingBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: theme.radius.sm,
  },
  eventDesc: {
    fontSize: 16,
    color: theme.colors.blueDark,
    paddingBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: theme.colors.blueDark,
    paddingBottom: 10,
  },
  eventLieu: {
    fontSize: 16,
    color: theme.colors.blueDark,
    paddingBottom: 10,
  },
  eventGenre: {
    fontSize: 16,
    color: theme.colors.blueDark,
    paddingBottom: 10,
  },
  eventParticipants: {
    fontSize: 16,
    color: theme.colors.blueDark,
  },
  variable: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  partButton: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.orange,
    borderWidth: 1,
    height: 40,
  },
  buttonText: {
    paddingHorizontal: 16,
    fontSize: 15,
  },
  inviteButtonText: {
    color: theme.colors.orange,
  },
});

export default Event;