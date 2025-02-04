import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Event from '../../components/Event';
import ScreenWrapper from '../../components/SreenWrapper';
import { theme } from '../../constants/theme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {error ? (
            <Text style={styles.errorText}>Error: {error.message}</Text>
          ) : (
            events.map(event => (
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
            ))
          )}
        </ScrollView>
        <Footer />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteorange,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteorange,
  },
  scrollView: {
    padding: 10,
    paddingBottom: 80, // To avoid content being hidden behind the footer
  },
  errorText: {
    color: theme.colors.rose,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EventsPage;