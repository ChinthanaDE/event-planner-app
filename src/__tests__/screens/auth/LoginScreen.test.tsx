import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import LoginScreen from '../../../screens/auth/logging/LoginScreen';
import authReducer, {clearError} from '../../../redux/slices/authSlice';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {CombinedNavigationProp} from '../../../types/navigation';
import {AuthState} from '../../../types/auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
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
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Welcome to your Portal')).toBeTruthy();
    expect(getByPlaceholderText('Enter Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
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
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Invalid credentials')).toBeTruthy();
  });

  it('navigates to SignUp screen when Sign Up button is pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.press(getByText('Sign Up'));

    expect(store.dispatch).toHaveBeenCalledWith(clearError());
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
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
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should handle successful login with Firebase', async () => {
    const email = 'chinthanadesilva@gmail.com';
    const password = 'password123';

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: {uid: '123', email},
    });

    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), email);
    fireEvent.changeText(getByPlaceholderText('Enter Password'), password);
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should handle login failure with Firebase', async () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid login credentials. Please try again.',
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

    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error('Invalid login credentials. Please try again.'),
    );

    const {getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), email);
    fireEvent.changeText(getByPlaceholderText('Enter Password'), password);
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(
        getByText('Invalid login credentials. Please try again.'),
      ).toBeTruthy();
    });
  });
});
