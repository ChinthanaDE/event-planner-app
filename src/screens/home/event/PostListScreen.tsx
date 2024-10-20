import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getComments} from '../../../services/eventApi';
import CustomHeader from '../../../components/CustomHeader';
import {BackButton, HeaderTitle} from '../../../components/HeaderComponents';
import PostCardSkeleton from '../../../components/skeletons/PostCardSkeleton';
import {AppEvent} from '../../../types/event';
import {
  EventStackNavigationProp,
  EventStackRouteProp,
} from '../../../types/navigation';

type PostListScreenNavigationProp = EventStackNavigationProp<'PostList'>;
type PostListScreenRouteProp = EventStackRouteProp<'PostList'>;

const PostListScreen: React.FC = () => {
  const navigation = useNavigation<PostListScreenNavigationProp>();
  const route = useRoute<PostListScreenRouteProp>();

  const {events} = route.params;
  const [posts, setPosts] = useState<AppEvent[]>(events);
  const [comments, setComments] = useState<Record<number, any[]>>({});
  const [visibleComments, setVisibleComments] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (events.length === 0) {
      setError('No events data received');
    } else {
      fetchComments();
    }
  }, [events]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await getComments();
      const commentsByPost = response.data.reduce((acc, comment) => {
        if (!acc[comment.postId]) {
          acc[comment.postId] = [];
        }
        acc[comment.postId].push(comment);
        return acc;
      }, {} as Record<number, any[]>);
      setComments(commentsByPost);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to fetch comments');
    }
    setLoading(false);
  };

  const toggleComments = (postId: number) => {
    setVisibleComments(prevVisible => ({
      ...prevVisible,
      [postId]: !prevVisible[postId],
    }));
  };

  const renderPostItem = ({item}: {item: AppEvent}) => (
    <View style={styles.cardContainer}>
      <Image source={{uri: item.thumbnailUrl}} style={styles.postImage} />

      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>

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

  const renderComments = (postId: number) => (
    <View style={styles.commentsContainer}>
      {comments[postId]?.map(comment => (
        <View key={comment.id} style={styles.commentItem}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentName}>{comment.name}</Text>
          </View>
          <Text style={styles.commentEmail}>{comment.email}</Text>
          <View style={styles.commentBodyContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#E97451" />
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPostCardSkeletons = () => (
    <FlatList
      data={[1, 2, 3]}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={() => <PostCardSkeleton />}
      keyExtractor={item => item.toString()}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          leftComponent={<BackButton onPress={() => navigation.goBack()} />}
          centerComponent={<HeaderTitle title="Post List" />}
        />
        {renderPostCardSkeletons()}
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          leftComponent={<BackButton onPress={() => navigation.goBack()} />}
          centerComponent={<HeaderTitle title="Post List" />}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
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
        renderItem={renderPostItem}
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
    backgroundColor: '#F9F9F9',
  },
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  textContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  commentsButton: {
    backgroundColor: '#E97451',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  commentsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
  },
  commentEmail: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 4,
  },
  commentBodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostListScreen;
