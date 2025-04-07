import express from 'express'; 
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',  
    password: '123123',
    port: 5432, 
});

app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
});

// Agregar 
app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const likes = 0;  

    try {
        const result = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, img, descripcion, likes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el post' });
    }
});

app.put('/posts/:id/like', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json({ message: 'Like agregado', post: result.rows[0] });
    } catch (error) {
        console.error('Error al actualizar el like:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json({ message: 'Post eliminado', post: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
