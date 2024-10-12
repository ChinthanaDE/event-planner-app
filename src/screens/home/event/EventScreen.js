import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import EventHeader from '../../../components/EventHeader';
import Organizer from '../../../components/Organizer';
import PostCard from '../../../components/PostCard';
import {useFetchEvents} from '../../../hooks/useFetchEvents';
import {useFetchOrganizers} from '../../../hooks/useFetchOrganizers';
import EventHeaderSkeleton from '../../../components/skeletons/EventHeaderSkeleton';
import OrganizerSkeleton from '../../../components/skeletons/OrganizerSkeleton';
import PostCardSkeleton from '../../../components/skeletons/PostCardSkeleton';

const EventScreen = ({Event}) => {
  const navigation = useNavigation();
  const {events, loading: eventsLoading, error: eventsError} = useFetchEvents();
  const {
    organizers,
    loading: organizersLoading,
    error: organizersError,
  } = useFetchOrganizers();

  const handleViewAllPosts = () => {
    navigation.navigate('PostList', {events: events});
  };

  const renderPostItem = ({item}) => (
    <View style={styles.cardWrapper}>
      <PostCard post={item} />
    </View>
  );

  const renderOrganizerSkeletons = () => (
    <>
      <OrganizerSkeleton />
      <View style={styles.separator} />
      <OrganizerSkeleton />
      <View style={styles.separator} />
      <OrganizerSkeleton />
    </>
  );

  const renderPostCardSkeletons = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.cardWrapper}>
        <PostCardSkeleton />
      </View>
      <View style={styles.cardWrapper}>
        <PostCardSkeleton />
      </View>
      <View style={styles.cardWrapper}>
        <PostCardSkeleton />
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {eventsLoading ? (
          <EventHeaderSkeleton />
        ) : eventsError ? (
          <Text>{eventsError}</Text>
        ) : (
          <EventHeader
            images={events.map(event => event.thumbnailUrl)}
            eventName="Sample Event"
            location="Event Location"
          />
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Organizers</Text>

          {organizersLoading ? (
            renderOrganizerSkeletons()
          ) : organizersError ? (
            <Text>{organizersError}</Text>
          ) : (
            organizers.map((organizer, index) => (
              <React.Fragment key={index}>
                <Organizer {...organizer} />
                {index < organizers.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))
          )}

          {/* Post Section */}
          <View style={styles.header}>
            <Text style={styles.postSectionTitle}>Photos</Text>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>All Photos</Text>
              <Ionicons name="arrow-forward" size={24} color="#Db2424" />
            </View>
          </View>

          <View style={styles.postsSection}>
            {eventsLoading ? (
              renderPostCardSkeletons()
            ) : (
              <FlatList
                data={events}
                renderItem={renderPostItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={316}
                viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                nestedScrollEnabled={true}
                style={styles.postList}
              />
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleViewAllPosts}
              style={styles.viewAllButton}>
              <Text style={styles.postsCount}>{events.length}</Text>
              <Text style={styles.postsLabel}>Posts</Text>
              <Ionicons name="arrow-forward" size={24} color="#DB2424" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  postsSection: {
    height: 320,
    marginTop: 16,
  },
  postList: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  postSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FF6B6B',
    marginRight: 4,
  },
  arrow: {
    color: '#FF6B6B',
  },
  cardWrapper: {
    marginRight: 0,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  postsCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DB2424',
    marginRight: 8,
  },
  postsLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,

    borderRadius: 8,
  },
});

export default EventScreen;
