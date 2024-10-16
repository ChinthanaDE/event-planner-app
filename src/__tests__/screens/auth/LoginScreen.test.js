import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginScreen from '../../../screens/auth/logging/LoginScreen';
import authReducer, { login, clearError } from '../../../redux/slices/authSlice';
import { auth } from '../../../utils/firebaseConfig';

jest.mock('../../../utils/firebaseConfig', () => ({
  auth: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');

describe('LoginScreen', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isLoading: false,
          error: null,
        },
      },
    });
    store.dispatch = jest.fn(store.dispatch);

    auth.mockReset();
    mockNavigation.navigate.mockReset();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
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
          isLoading: false,
          error: 'Invalid credentials',
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Invalid credentials')).toBeTruthy();
  });

  it('navigates to SignUp screen when Sign Up button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText('Sign Up'));

    expect(store.dispatch).toHaveBeenCalledWith(clearError());
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('shows loading indicator when isLoading is true', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isLoading: true,
          error: null,
        },
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should handle successful login with Firebase', async () => {
    const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue({
      user: { uid: '123456', email: 'chinthanadesilva@gmail.com' },
    });
    auth.mockReturnValue({
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), 'chinthanadesilva@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Enter Password'), '123456');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('chinthanadesilva@gmail.com', '123456');
  });

  it('should handle login failure with Firebase', async () => {
    const mockSignInWithEmailAndPassword = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    auth.mockReturnValue({
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter Email'), 'china@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Enter Password'), '1234567');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('china@gmail.com', '1234567');
    expect(getByText('Invalid credentials')).toBeTruthy();
  });
});