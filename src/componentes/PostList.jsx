import React from 'react';

function PostList({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={post.img} alt={post.titulo} />
          <div className="post-content">
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
