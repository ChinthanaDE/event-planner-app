import axios, {AxiosInstance} from 'axios';

const eventApi: AxiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default eventApi;

export type GetPostsResponse = {
  id: number;
  title: string;
  body: string;
  userId: number;
}[];

export type GetPhotosResponse = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}[];

export type GetUsersResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}[];

export type GetCommentsResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}[];

export const getPosts = () => eventApi.get<GetPostsResponse>('/posts');
export const getPhotos = () => eventApi.get<GetPhotosResponse>('/photos');
export const getUsers = () => eventApi.get<GetUsersResponse>('/users');
export const getComments = () => eventApi.get<GetCommentsResponse>('/comments');
