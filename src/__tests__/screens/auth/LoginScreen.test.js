import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginScreen from '../../../screens/auth/logging/LoginScreen';
import authReducer, { login, clearError } from '../../../redux/slices/authSlice';

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
});