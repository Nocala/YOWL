import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { theme } from '../constants/theme'

const Article = ({ title, description, body, sport, date, id_media, author }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: id_media }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.sport}>{sport}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.author}>By {author}</Text>
    </View>
  )
}

export default Article

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.whiteorange,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    marginVertical: 5,
  },
  body: {
    fontSize: 14,
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginVertical: 5,
  },
  sport: {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.colors.blueDark,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginVertical: 5,
  },
  author: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginVertical: 5,
    textAlign: 'right',
  },
})