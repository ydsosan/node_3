import React from 'react';

function PostList({ posts, handleLike, handleDelete }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={post.img} alt={post.titulo} />
          <div className="post-content">
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
          </div>
          <div className="post-footer">
            <button className="like-btn" onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(post.id)}>
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
