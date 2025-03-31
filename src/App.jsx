import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './componentes/PostForm';
import PostList from './componentes/PostList';

const API_URL = 'http://localhost:3001/posts';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="container">
      <h1 className="title">📸 Like Me 📸</h1>
      <div className="content">
        <PostForm fetchPosts={fetchPosts} />
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default App;
