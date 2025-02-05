import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import Button from '../components/Button';

const Event = ({ name, date, lieu, sport, genre, nb_participants, nb_participants_max, description, id_media }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (id_media) {
      const url = `http://16.171.155.129:3000/media/id/${id_media}`;
      setImageUrl(url);
    }
  }, [id_media]);

  const formattedDate = new Date(date).toLocaleDateString('fr-FR');

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventName}>{name}</Text>

      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.eventImage} />}

      <Text style={styles.eventSport}>{sport}</Text>

      <Text style={styles.eventDesc}>Description : {description}</Text>

      <Text style={styles.eventDate}>Le {formattedDate}</Text>

      <Text style={styles.eventLieu}>A {lieu}</Text>

      <Text style={styles.eventGenre}>Genre :
        <Text style={styles.variable}> {genre}</Text>  
      </Text>

      <Text style={styles.eventPart}>Participants : 
        <Text style={styles.variable}> {nb_participants}/{nb_participants_max}</Text>  
      </Text>

      <View style={styles.buttonContainer}>
        <Button 
            title="Je veux participer" 
            buttonStyle={styles.partButton} 
            textStyle={styles.buttonText} 
            onPress={() => { /* action pour participer */ }} />

        <Button 
            title="Inviter un ami" 
            buttonStyle={styles.inviteButton} 
            textStyle={[styles.inviteButtonText, styles.buttonText]} 
            onPress={() => { /* action pour inviter un ami */ }}  />

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
    eventPart: {
        fontSize: 16,
        color: theme.colors.blueDark,
    },
    variable: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,

    },
    inviteButton: {
        backgroundColor: theme.colors.whiteorange,
        borderColor: theme.colors.orange,
        borderWidth: 1,  
        height: 40, // Reduced height
    },
    partButton: {
        backgroundColor: theme.colors.orange,
        borderColor: theme.colors.orange,
        borderWidth: 1,
        height: 40, // Reduced height
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