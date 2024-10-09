import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const PostCard = ({post}) => {
  console.log('post', post);
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: post.uri}}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription} numberOfLines={2}>
          {post.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postContent: {
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 100,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PostCard;
