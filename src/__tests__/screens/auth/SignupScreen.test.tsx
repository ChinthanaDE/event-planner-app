import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import SignUpScreen from '../../../screens/auth/logging/SignUpScreen';
import authReducer, {clearError} from '../../../redux/slices/authSlice';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {CombinedNavigationProp} from '../../../types/navigation';
import {AuthState} from '../../../types/auth';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
  dispatch: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
} as unknown as CombinedNavigationProp;

jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');

describe('LoginScreen', () => {
  let store: EnhancedStore<{auth: AuthState}>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          registrationStep: 0,
          profileImage: null,
          profileImageUrl: null,
          personalInfo: null,
          hasCompletedRegistration: false,
        },
      },
    });

    jest.clearAllMocks();
    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Welcome to your Portal')).toBeTruthy();
    expect(getByPlaceholderText('Enter Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('displays error message when login fails', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid credentials',
          registrationStep: 0,
          profileImage: null,
          profileImageUrl: null,
          personalInfo: null,
          hasCompletedRegistration: false,
        },
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Invalid credentials')).toBeTruthy();
  });

  it('navigates to Login screen when Login Up button is pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.press(getByText('Login'));

    expect(store.dispatch).toHaveBeenCalledWith(clearError());
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('shows loading indicator when isLoading is true', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: true,
          error: null,
          registrationStep: 0,
          profileImage: null,
          profileImageUrl: null,
          personalInfo: null,
          hasCompletedRegistration: false,
        },
      },
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should handle successful signup with Firebase', async () => {
    const email = 'newuser@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: {uid: '456', email},
    });

    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), email);
    fireEvent.changeText(getByPlaceholderText('Enter Password'), password);
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      confirmPassword,
    );
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should handle signup failure with Firebase', async () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Password should be at least 6 characters.',
          registrationStep: 0,
          profileImage: null,
          profileImageUrl: null,
          personalInfo: null,
          hasCompletedRegistration: false,
        },
      },
    });
    const email = 'test@example.com';
    const password = '1234567';
    const confirmPassword = '12345';

    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error('Password should be at least 6 characters.'),
    );

    const {getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), email);
    fireEvent.changeText(getByPlaceholderText('Enter Password'), password);
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      confirmPassword,
    );
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(
        getByText('Password should be at least 6 characters.'),
      ).toBeTruthy();
    });
  });
});
