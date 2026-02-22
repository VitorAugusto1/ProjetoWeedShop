const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const port = 3000;
const users = [];

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) return res.status(400).json({ message: "Não foi possível registrar o usuário" });

    res.json({ message: 'Usuário registrado com sucesso'});
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ message: "Credenciais inválidas" });
    }

    return res.json({ message: 'Login realizado com sucesso'});
});

app.get("/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");
    
    if (error) {
        return res.status(400).json({ message: "Erro ao buscar usuários" });
    }

    res.json(data);
});

app.listen(port, ()=> {
    console.log(`Servidor rodando em http://localhost:${port}`);
});