const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const port = 3000;
const users = [];

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);


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
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      email_verified: u.user_metadata?.email_verified ?? false
    }));


    return res.json(users);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

app.listen(port, ()=> {
    console.log(`Servidor rodando em http://localhost:${port}`);
});