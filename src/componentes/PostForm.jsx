import React, { useState } from 'react';

function PostForm({ fetchPosts }) {
  const [titulo, setTitulo] = useState('');
  const [img, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const API_URL = 'http://localhost:3001/posts';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { titulo, img, descripcion };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    
    if (response.ok) {
      fetchPosts();
      setTitulo('');
      setImagen('');
      setDescripcion('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Agregar post</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={img}
        onChange={(e) => setImagen(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default PostForm;
