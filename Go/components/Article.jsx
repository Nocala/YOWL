import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { theme } from '../constants/theme'

const Article = ({ title, description, sport, date, id_media, author }) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (id_media) {
      const url = `http://16.171.155.129:3000/media/id/${id_media}`
      setImageUrl(url)
    }
  }, [id_media])

  const formattedDate = new Date(date).toLocaleDateString('fr-FR')

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.sport}>{sport}</Text>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.author}>By {author}</Text>
      </View>
    </View>
  )
}

export default Article

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.whiteorange,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.blueDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 2,
  },
  sport: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.orange,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: theme.radius.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.orange,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: theme.colors.blueDark,
    textAlign: 'right',
    marginTop: 'auto',
  },
})