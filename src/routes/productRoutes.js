const express = require('express');
const router = express.Router();
const { criarProduto, listaProdutosUsuarios, deleteProduto, deleteProdutoLote, atualizarProduto } = require('../controllers/productController');

router.post('/products', criarProduto);
router.get('/products/me', listaProdutosUsuarios);
router.delete('/products/:id', deleteProduto);
router.delete('/products', deleteProdutoLote);
router.put('/products/:id', atualizarProduto);

module.exports = router;