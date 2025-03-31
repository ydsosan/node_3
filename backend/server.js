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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
