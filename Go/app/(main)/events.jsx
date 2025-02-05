import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, } from 'react-native';
import { useRouter } from "expo-router";

import { theme } from '../../constants/theme';
import Event from '../../components/Event';
import ScreenWrapper from '../../components/SreenWrapper';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Plus from '../../assets/icons/Plus';


const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

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
                eventId={event.id_event} 
              />
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={[styles.fab, { bottom: 80 }]} onPress={() => router.push('/creation_event')}>
          <Plus strokeWidth={2} color={theme.colors.orange}/>
        </TouchableOpacity>

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
    paddingBottom: 80,
  },
  errorText: {
    color: theme.colors.rose,
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.whiteorange,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 2, // Add border width
    borderColor: theme.colors.orange, // Add border color
  },
});

export default EventsPage;