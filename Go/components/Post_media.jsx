import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { theme } from '../constants/theme';

const PostMedia = ({ description, username, likes, id_media }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (id_media) {
      const url = `http://16.171.155.129:3000/media/id/${id_media}`;
      setImageUrl(url);

      // Fetch image size
      Image.getSize(url, (width, height) => {
        setImageSize({ width, height });
      });
    }
  }, [id_media]);

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { aspectRatio: imageSize.width / imageSize.height }]}
        />
      )}
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.username}>{username}</Text>
      {/*<Text style={styles.likes}>{likes} likes</Text>*/}
    </View>
  );
};

export default PostMedia;

const styles = StyleSheet.create({
  container: {
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
  image: {
    width: '100%',
    resizeMode: 'contain',
    borderRadius: theme.radius.sm,
  },
  description: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 15,
  },
  username: {
    fontSize: 15,
    fontWeight: 'semibold',
    marginBottom: 5,
    color: theme.colors.blueDark,
  },
  //likes: {
    //fontSize: 12,
    //color: theme.colors.orange,
  //},
});