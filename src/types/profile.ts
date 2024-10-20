import {User} from './auth';

export interface Profile extends User {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}
