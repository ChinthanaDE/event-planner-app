import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import SignUpScreen from '../../../screens/auth/logging/SignUpScreen';
import authReducer, {
  signup,
  clearError,
  setError,
} from '../../../redux/slices/authSlice';
import {auth} from '../../../utils/firebaseConfig';

jest.mock('../../../utils/firebaseConfig', () => ({
  auth: jest.fn(),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
      })),
    })),
  })),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');

describe('SignUpScreen', () => {
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
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Welcome to your Portal')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByPlaceholderText('Retype Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('displays error message when signup fails', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isLoading: false,
          error: 'Email already in use',
        },
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText('Email already in use')).toBeTruthy();
  });

  it('navigates to Login screen when Login button is pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.press(getByText('Login'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
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

    const {getByTestId} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should handle successful signup with Firebase', async () => {
    const mockCreateUserWithEmailAndPassword = jest.fn().mockResolvedValue({
      user: {uid: '123456', email: 'chinthanadesilva@gmail.com'},
    });
    auth.mockReturnValue({
      createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    });

    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Enter email'),
      'chinthanadesilva@gmail.com',
    );
    fireEvent.changeText(getByPlaceholderText('Enter password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Retype Password'), '123456');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      'chinthanadesilva@gmail.com',
      '123456',
    );
  });

  it('should show error when passwords do not match', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Enter email'),
      'chinthanadesilva@gmail.com',
    );
    fireEvent.changeText(getByPlaceholderText('Enter password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Retype Password'), '12345');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      const errorMessage =
        queryByText('Passwords must match') ||
        queryByText('Passwords do not match') ||
        queryByText(/password.*match/i);
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should handle Firebase errors', async () => {
    const mockCreateUserWithEmailAndPassword = jest
      .fn()
      .mockRejectedValue(
        new Error('Firebase: Error (auth/email-already-in-use).'),
      );
    auth.mockReturnValue({
      createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    });

    const {getByPlaceholderText, getByText, findByText} = render(
      <Provider store={store}>
        <SignUpScreen navigation={mockNavigation} />
      </Provider>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Enter email'),
      'chinthanadesilva@gmail.com',
    );
    fireEvent.changeText(getByPlaceholderText('Enter password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Retype Password'), '123456');
    fireEvent.press(getByText('Sign Up'));

    const errorMessage = await findByText(/email-already-in-use/i);
    expect(errorMessage).toBeTruthy();
  });
});
