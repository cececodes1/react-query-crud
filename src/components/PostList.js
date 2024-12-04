import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost } from '../api';
import PostForm from './PostForm';

const PostList = () => {
    const queryClient = useQueryClient();
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    const deletePostMutation = useMutation({
        mutationFn: (postId) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;

    return (
        <div>
            <h1>Posts</h1>
            <PostForm />
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => deletePostMutation.mutate(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;