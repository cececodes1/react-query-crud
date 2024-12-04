import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (newPost) => {
    const response = await axios.post(API_URL, newPost);
    return response.data;
};

export const updatePost = async (updatedPost) => {
    const response = await axios.put(`${API_URL}/${updatedPost.id}`, updatedPost);
    return response.data;
};

export const deletePost = async (postId) => {
    await axios.delete(`${API_URL}/${postId}`);
};