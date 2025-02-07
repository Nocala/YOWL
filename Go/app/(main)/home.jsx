import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../../constants/theme'
import Post_txt from '../../components/Post_txt'
import Post_media from '../../components/Post_media'
import ScreenWrapper from '../../components/SreenWrapper'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsMedia, setPostsMedia] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://16.171.155.129:3000/posts-txt');
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          console.error('Failed to fetch posts:', data);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    fetch('http://16.171.155.129:3000/posts-media')
      .then(response => response.json())
      .then(data => setPostsMedia(data.mediaPosts))
      .catch(error => console.error('Error fetching posts media:', error));
  }, []);

  const mergedPosts = [];
  let txtIndex = 0, mediaIndex = 0;

  while (txtIndex < posts.length || mediaIndex < postsMedia.length) {
    if (mediaIndex < postsMedia.length) {
      mergedPosts.push(postsMedia[mediaIndex]);
      mediaIndex++;
    }
    if (mediaIndex < postsMedia.length) {
      mergedPosts.push(postsMedia[mediaIndex]);
      mediaIndex++;
    }
    if (txtIndex < posts.length) {
      mergedPosts.push(posts[txtIndex]);
      txtIndex++;
    }
  }

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.headerText}>Pour toi</Text>

        {mergedPosts.map((post, index) =>
          post.post_txt_id ? (
            <Post_txt
              key={`txt-${post.post_txt_id}`}
              title={post.text}
              description={post.description}
              username={post.username}
            />
          ) : (
            <Post_media
              key={`media-${post.post_media_id}`}
              description={post.description}
              username={post.username}
              id_media={post.id_media}
            />
          )
        )}
      </ScrollView>

      <Footer />
    </ScreenWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.orange,
    marginLeft: 10,
  },
  pluspost: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: theme.colors.whiteorange,
    borderColor: theme.colors.blueDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '5%',
    bottom: '10%'
  },
});
