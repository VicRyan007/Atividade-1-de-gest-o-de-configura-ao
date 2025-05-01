const express = require('express');
const app = express();
const port = 3000;
produtos = [
    { id: 1, nome: 'Tv OLED Samsung', preco: 3500.00 },
    { id: 2, nome: 'Console PS5 2 Controles', preco: 3999.00 },
    { id: 3, nome: 'Air-Fryer Mondial', preco: 350.00 }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API de produtos' });
}
);

app.get('/api/produtos', (req, res) => {
    res.status(200).json(produtos);
});



app.post('/api/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const novoProduto = {
        id: Date.now(),
        nome: nome,
        preco: preco
    };
    produtos.push(novoProduto);
    res.status(201).json({ message: 'Produto adicionado com sucesso!', produto: novoProduto });

})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});