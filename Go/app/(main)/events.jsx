import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Event from '../../components/Event';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://16.171.155.129:3000/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data.events);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {events.map(event => (
        <Event
          key={event.id_event}
          name={event.name}
          date={event.date}
          lieu={event.lieu}
          sport={event.sport}
          genre={event.genre}
          nb_participants={event.nb_participants}
          nb_participants_max={event.nb_participants_max}
          description={event.description}
          id_media={event.id_media}
        />
      ))}
    </ScrollView>
  );
};

export default EventsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});