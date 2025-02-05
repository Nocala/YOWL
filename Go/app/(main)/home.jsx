import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Post from '../../components/Post_txt';
import ScreenWrapper from '../../components/SreenWrapper';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { theme } from '../../constants/theme';

const Home = (size=24) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://16.171.155.129:3000/posts-txt');
        const data = await response.json();
        if (response.ok) {
          console.log('Posts fetched successfully:', data.posts);
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

  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {posts.map((post) => (
          <Post 
            key={post.post_txt_id} 
            title={post.text}
            description={post.description} 
            username={post.username}
            likes={post.likes}
          />
        ))}
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