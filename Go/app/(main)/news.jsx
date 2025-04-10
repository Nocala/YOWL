import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/SreenWrapper'
import Article from '../../components/Article'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>

          <Text style={styles.titleText}>News</Text>

          {articles.map(article => (
            <Article
              key={article.id_article}
              id_article={article.id_article}
              title={article.titre}
              description={article.description}
              body={article.corps}
              sport={article.sport}
              date={article.date}
              id_media={article.id_media}
              author={article.auteur}
            />
          ))}
        </ScrollView>
        <Footer />
      </View>
    </ScreenWrapper>
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
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.orange,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
})