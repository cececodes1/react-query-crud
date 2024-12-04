import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './components/PostList';
import './App.css'; 

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <PostList />
            </div>
        </QueryClientProvider>
    );
};

export default App;
