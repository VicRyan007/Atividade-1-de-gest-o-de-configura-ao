const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/produtos', (req, res) => {
    const produtos = [
        { id: 1, nome: 'Tv OLED Samsung', preco: 3500.00 },
        { id: 2, nome: 'Console PS5 2 Controles', preco: 3999.00 },
        { id: 3, nome: 'Air-Fryer Mondial', preco: 350.00 }
    ]; 
    res.status(200).json(produtos);
});

