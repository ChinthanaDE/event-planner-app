export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationStep: number;
  profileImage: string | null;
  profileImageUrl: string | null;
  personalInfo: PersonalInfo | null;
  hasCompletedRegistration: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface ProfileImagePayload {
  localUri: string;
  downloadUrl: string;
}

export interface RegistrationCompletedPayload {
  personalInfo: PersonalInfo;
  profileImageUrl: string;
}
