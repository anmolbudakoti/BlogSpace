import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies with requests
});

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface CreateCommentData {
  content: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData: CreatePostData): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', postData);
  return response.data;
};

export const updatePost = async (id: string, postData: CreatePostData): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};

export const likePost = async (id: string): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${id}/like`);
  return response.data;
};

export const getCommentsByPost = async (postId: string): Promise<Comment[]> => {
  const response = await apiClient.get<Comment[]>(`/comments/post/${postId}`);
  return response.data;
};

export const createComment = async (postId: string, commentData: CreateCommentData): Promise<Comment> => {
  const response = await apiClient.post<Comment>(`/comments/post/${postId}`, commentData);
  return response.data;
};

export const updateComment = async (id: string, commentData: CreateCommentData): Promise<Comment> => {
  const response = await apiClient.put<Comment>(`/comments/${id}`, commentData);
  return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  await apiClient.delete(`/comments/${id}`);
};