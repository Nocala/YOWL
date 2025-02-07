import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../constants/theme';

const Post_txt = ({ title, description, username, likes }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.post}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.informationpost}>
        <Text style={styles.username}>{username}</Text>
        {/*<View style={styles.likesContainer}>
          <Icon name="heart" size={20} color="red" />
          <Text style={styles.likes}>{likes}</Text>
        </View>*/}
      </View>
    </View>
  );
}

export default Post_txt;

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.whiteorange,
    borderRadius: 10,
    shadowColor: theme.colors.blueDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  username: {
    fontSize: 15,
    fontWeight: 'semibold',
    marginBottom: 5,
    color: theme.colors.blueDark
  },
  title: {
    fontSize: 20,
    fontWeight: theme.fonts.bold,
    marginBottom: 5,
    color: theme.colors.orange
  },
  description: {
    fontSize: 15,
    color: theme.colors.blueDark,
    marginBottom: 10,
  },
  //likesContainer: {
    //flexDirection: 'row',
    //alignItems: 'center',
  //},
  //likes: {
    //fontSize: 15,
    //marginLeft: 2.5,
  //},
  informationpost:{
    flexDirection: 'row',
    flexWrap:'wrap',
    gap: 15,
  }
});