import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import eventApi from '../../services/eventApi';

const PostListScreen = () => {
  const route = useRoute();
  const { events } = route.params;
  const [posts, setPosts] = useState(events);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await eventApi.get('/comments');
      const commentsByPost = response.data.reduce((acc, comment) => {
        if (!acc[comment.postId]) {
          acc[comment.postId] = [];
        }
        acc[comment.postId].push(comment);
        return acc;
      }, {});
      setComments(commentsByPost);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      <TouchableOpacity
        style={styles.commentsButton}
        onPress={() => toggleComments(item.id)}
      >
        <Text style={styles.commentsButtonText}>
          {comments[item.id] ? 'Hide Comments' : 'Show Comments'}
        </Text>
      </TouchableOpacity>
      {comments[item.id] && renderComments(item.id)}
    </View>
  );

  const renderComments = (postId) => (
    <View style={styles.commentsContainer}>
      {comments[postId]?.map((comment) => (
        <View key={comment.id} style={styles.commentItem}>
          <Text style={styles.commentName}>{comment.name}</Text>
          <Text style={styles.commentEmail}>{comment.email}</Text>
          <Text style={styles.commentBody}>{comment.body}</Text>
        </View>
      ))}
    </View>
  );

  const toggleComments = (postId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: prevComments[postId] ? null : comments[postId],
    }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  commentsButton: {
    backgroundColor: '#DB2424',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  commentsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 12,
  },
  commentItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  commentBody: {
    fontSize: 14,
    color: '#444',
  },
});

export default PostListScreen;