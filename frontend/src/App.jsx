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

  const handleLike = async (id) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const response = await fetch(`${API_URL}/${id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: post.likes + 1 }),
    });

    if (response.ok) fetchPosts();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) fetchPosts();
  };

  return (
    <div className="container">
      <h1 className="title">📸 Like Me 📸</h1>
      <div className="content">
        <PostForm fetchPosts={fetchPosts} />
        <PostList posts={posts} handleLike={handleLike} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
