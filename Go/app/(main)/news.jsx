import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Article from '../../components/Article'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { theme } from '../../constants/theme'

const News = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://16.171.155.129:3000/articles')
        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        {articles.map(article => (
          <Article
            key={article.id_article}
            title={article.titre}
            description={article.description}
            body={article.corps}
            sport={article.sport}
            date={article.date}
            id_media={`http://16.171.155.129:3000${article.filepath}`}
            author={article.auteur}
          />
        ))}
      </ScrollView>
      <Footer />
    </View>
  )
}

export default News

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteorange,
  },
  scrollView: {
    flex: 1,
  },
})