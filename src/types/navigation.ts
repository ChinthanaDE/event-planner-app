import {DrawerNavigationProp as RNDrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ImageUpload: undefined;
  PersonalInfo: undefined;
};

export type EventStackParamList = {
  EventList: undefined;
  PostList: undefined;
};

export type ProfileStackParamList = {
  UserProfile: undefined;
  UserEditProfile: undefined;
};

export type TabParamList = {
  Events: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type RootParamList = RootStackParamList &
  DrawerParamList &
  TabParamList &
  EventStackParamList &
  ProfileStackParamList &
  AuthStackParamList;

export type DrawerNavigationProp<T extends keyof DrawerParamList> =
  RNDrawerNavigationProp<DrawerParamList, T>;

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type TabNavigationProp<T extends keyof TabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, T>,
    DrawerNavigationProp<'MainTabs'>
  >;

export type EventStackNavigationProp<T extends keyof EventStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<EventStackParamList, T>,
    TabNavigationProp<'Events'>
  >;

export type ProfileStackNavigationProp<T extends keyof ProfileStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<ProfileStackParamList, T>,
    TabNavigationProp<'Profile'>
  >;

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  StackNavigationProp<AuthStackParamList, T>;

export type CustomRouteProp<T extends keyof RootParamList> = RouteProp<
  RootParamList,
  T
>;
