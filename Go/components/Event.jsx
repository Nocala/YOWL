import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const Event = ({ name, date, lieu, sport, genre, nb_participants, nb_participants_max, description, id_media }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (id_media) {
      fetch(`http://16.171.155.129:3000/media/id/${id_media}`)
        .then(response => response.json())
        .then(data => {
          if (data.filepath) {
            setImageUrl(`http://16.171.155.129:3000${data.filepath}`);
          }
        })
        .catch(error => {
          console.error('Error fetching media:', error);
        });
    }
  }, [id_media]);

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventName}>{name}</Text>
      <Text style={styles.eventText}>Date: {date}</Text>
      <Text style={styles.eventText}>Lieu: {lieu}</Text>
      <Text style={styles.eventText}>Sport: {sport}</Text>
      <Text style={styles.eventText}>Genre: {genre}</Text>
      <Text style={styles.eventText}>Participants: {nb_participants}/{nb_participants_max}</Text>
      <Text style={styles.eventText}>Description: {description}</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.eventImage} />}
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
    color: theme.colors.primaryDark,
  },
  eventText: {
    color: theme.colors.text,
    marginBottom: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: theme.radius.sm,
  },
});

export default Event;