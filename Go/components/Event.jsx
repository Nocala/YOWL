import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const Event = ({ name, date, lieu, sport, genre, nb_participants, nb_participants_max, description, id_media }) => {
  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventName}>{name}</Text>
      <Text style={styles.eventText}>Date: {date}</Text>
      <Text style={styles.eventText}>Lieu: {lieu}</Text>
      <Text style={styles.eventText}>Sport: {sport}</Text>
      <Text style={styles.eventText}>Genre: {genre}</Text>
      <Text style={styles.eventText}>Participants: {nb_participants}/{nb_participants_max}</Text>
      <Text style={styles.eventText}>Description: {description}</Text>
      {id_media && <Image source={{ uri: `/path/to/media/${id_media}` }} style={styles.eventImage} />}
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