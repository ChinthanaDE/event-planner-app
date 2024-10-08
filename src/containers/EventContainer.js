import React from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventHeader from '../components/EventHeader';
import Organizer from '../components/Organizer';
import PostCard from '../components/PostCard';
import {eventData} from '../constants/event'

const EventContainer = () => {
  const renderPostItem = ({item}) => (
    <View style={styles.cardWrapper}>
      <PostCard post={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <EventHeader
          images={eventData.images}
          eventName={eventData.eventName}
          location={eventData.location}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Organizers</Text>

          {eventData.organizers.map((organizer, index) => (
            <React.Fragment key={index}>
              <Organizer {...organizer} />
              {index < eventData.organizers.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
          <View style={styles.header}>
            <Text style={styles.postSectionTitle}>Photos</Text>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>All Photos</Text>
              <Ionicons name="arrow-forward" size={24} color="#Db2424" />
            </View>
          </View>
          <View style={styles.postsSection}>
            <FlatList
              data={eventData.posts}
              renderItem={renderPostItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={316}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
              nestedScrollEnabled={true}
              style={styles.postList}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.postsCount}>{eventData.postCount}</Text>
            <Text style={styles.postsLabel}>Posts</Text>
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
  },
  postsLabel: {
    fontSize: 14,
  },
});

export default EventContainer;
