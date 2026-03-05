const express = require('express');
const router = express.Router();
const { register, login, listaUsuarios, deleteUsuario } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', listaUsuarios);
router.delete('/users/:id', deleteUsuario);

module.exports = router;