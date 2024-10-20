import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EventScreen from '../screens/home/event/EventScreen';
import PostListScreen from '../screens/home/event/PostListScreen';
import {EventStackParamList} from '../types/navigation';

const Stack = createStackNavigator<EventStackParamList>();

const EventStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EventList" component={EventScreen} />
      <Stack.Screen
        name="PostList"
        component={PostListScreen}
        options={{headerShown: false, title: 'Posts'}}
      />
    </Stack.Navigator>
  );
};

export default EventStackNavigator;
