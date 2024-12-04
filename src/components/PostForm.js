import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '../api';

const PostForm = ({ post }) => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');

    const createPostMutation = useMutation({
        mutationFn: (newPost) => createPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            setTitle('');
            setBody('');
        },
    });

    const updatePostMutation = useMutation({
        mutationFn: (updatedPost) => updatePost(updatedPost),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            setTitle('');
            setBody('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (post) {
            updatePostMutation.mutate({ ...post, title, body });
        } else {
            createPostMutation.mutate({ title, body });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
        </form>
    );
};

export default PostForm;