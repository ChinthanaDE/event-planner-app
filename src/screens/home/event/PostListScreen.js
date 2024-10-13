import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import eventApi from '../../../services/eventApi';
import CustomHeader from '../../../components/CustomHeader';
import {BackButton, HeaderTitle} from '../../../components/HeaderComponents';

const PostListScreen = ({navigation}) => {
  const route = useRoute();
  const {events} = route.params || {};
  const [posts, setPosts] = useState(events || []);
  const [comments, setComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!events || events.length === 0) {
      setError('No events data received');
    } else {
      fetchComments();
    }
  }, [events]);

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
      setError('Failed to fetch comments');
    }
    setLoading(false);
  };

  const toggleComments = postId => {
    setVisibleComments(prevVisible => ({
      ...prevVisible,
      [postId]: !prevVisible[postId],
    }));
  };

  const renderPost = ({item}) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      <TouchableOpacity
        style={styles.commentsButton}
        onPress={() => toggleComments(item.id)}>
        <Text style={styles.commentsButtonText}>
          {visibleComments[item.id] ? 'Hide Comments' : 'Show Comments'}
        </Text>
      </TouchableOpacity>
      {visibleComments[item.id] && renderComments(item.id)}
    </View>
  );

  const renderComments = postId => (
    <View style={styles.commentsContainer}>
      {comments[postId]?.map(comment => (
        <View key={comment.id} style={styles.commentItem}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentName}>{comment.name}</Text>
          </View>
          <Text style={styles.commentEmail}>{comment.email}</Text>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Ionicons name="chatbubble-outline" size={20} color="#E97451" />
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E97451" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={<HeaderTitle title="Post List" />}
      />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts available</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  postBody: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  commentsButton: {
    backgroundColor: '#E97451',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
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
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  commentEmail: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  commentBody: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PostListScreen;
