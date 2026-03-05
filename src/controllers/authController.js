const { supabase, supabaseAdmin } = require('../config/supabase');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '')
    return res.status(400).json({ message: 'Email é obrigatório' });

  if (!emailRegex.test(email))
    return res.status(400).json({ message: 'O email informado é inválido' });

  if (!password || password.trim() === '')
    return res.status(400).json({ message: 'Uma senha é obrigatória' });

  if (password.length < 6)
    return res.status(400).json({ message: 'A senha deve conter pelo menos 6 caracteres' });

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const message = error.message.includes('already registered')
      ? 'Email já registrado'
      : 'Erro ao registrar';
    return res.status(400).json({ message });
  }

  return res.json({ message: 'Usuário registrado com sucesso', data });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '')
    return res.status(400).json({ message: 'O email é obrigatório' });

  if (!emailRegex.test(email))
    return res.status(400).json({ message: 'O email informado é inválido' });

  if (!password || password.trim() === '')
    return res.status(400).json({ message: 'A senha é obrigatória' });

  if (password.length < 6)
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    let message = 'Erro ao fazer login';
    if (error.message.includes('Invalid login credentials')) message = 'Email ou senha incorretos';
    else if (error.message.includes('Email not confirmed')) message = 'O email ainda não foi confirmado';
    else if (error.message.includes('User banned')) message = 'Esta conta está desativada';
    return res.status(400).json({ message });
  }

  return res.json({ message: 'Login realizado com sucesso', data });
};

const listaUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) return res.status(400).json({ message: error.message });

    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      email_verified: u.user_metadata?.email_verified ?? false
    }));

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) return res.status(400).json({ message: 'Erro ao deletar usuário', error });

    return res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).json({ message: 'Erro interno ao deletar usuário' });
  }
};

module.exports = { register, login, listaUsuarios, deleteUsuario };