const { supabase } = require('../config/supabase');

const criarProduto = async (req, res) => {
  const { nome, quantidade, data, preco } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  const user_id = userData.user.id;

  if (!nome || nome.trim() === '')
    return res.status(400).json({ message: 'O nome do produto e obrigatorio' });

  if (quantidade === undefined || quantidade === null)
    return res.status(400).json({ message: 'A quantidade e obrigatoria' });

  if (typeof quantidade !== 'number' || quantidade < 0)
    return res.status(400).json({ message: 'A quantidade deve ser um numero positivo' });

  if (preco === undefined || preco === null)
    return res.status(400).json({ message: 'O preco do produto e obrigatorio' });

  if (typeof preco !== 'number' || preco < 0)
    return res.status(400).json({ message: 'O preco deve ser um numero positivo' });

  if (!data || data.trim() === '')
    return res.status(400).json({ message: 'A data e obrigatoria' });

  const { data: result, error } = await supabase
    .from('products')
    .insert([{ nome, quantidade, data, preco, user_id }])
    .select()
    .single();

  if (error) {
    console.error(error);
    return res.status(400).json({ message: 'Erro ao cadastrar produto', error: error.message });
  }

  return res.status(201).json({ message: 'Produto cadastrado com sucesso', data: result });
};

const listaProdutosUsuarios = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  const user_id = userData.user.id;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user_id);

  if (error)
    return res.status(400).json({ message: 'Erro ao buscar produtos', error: error.message });

const produtos = data.map(p => ({
  ...p,
  data: p.data.split('-').reverse().join('-'),
  preco: `R$ ${parseFloat(p.preco).toFixed(2)}`
}));

  return res.json(produtos);
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  const user_id = userData.user.id;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id);

  if (error)
    return res.status(400).json({ message: 'Erro ao excluir produto', error: error.message });

  return res.json({ message: 'Produto excluido com sucesso' });
};

const deleteProdutoLote = async (req, res) => {
  const { ids } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  if (!ids || !Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ message: 'Informe uma lista de IDs para excluir' });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  const user_id = userData.user.id;

  const { error } = await supabase
    .from('products')
    .delete()
    .in('id', ids)
    .eq('user_id', user_id);

  if (error)
    return res.status(400).json({ message: 'Erro ao excluir produtos', error: error.message });

  return res.json({ message: `${ids.length} produto(s) excluido(s) com sucesso` });
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, data, preco } = req.body;
const token = req.headers.authorization?.split(' ')[1]?.replace(/"/g, '');

    console.log('TOKEN:', token);
  console.log('ID:', id);

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  const user_id = userData.user.id;

  const updates = {};
  if (nome) updates.nome = nome;
  if (quantidade !== undefined) updates.quantidade = quantidade;
  if (data) updates.data = data;
  if (preco !== undefined) updates.preco = preco;

  if (Object.keys(updates).length === 0)
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });

const { data: result, error } = await supabase
  .from('products')
  .update(updates)
  .eq('id', id)
  .eq('user_id', user_id)
  .select();

if (error)
  return res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });

if (!result || result.length === 0)
  return res.status(404).json({ message: 'Produto nao encontrado' });

return res.json({ message: 'Produto atualizado com sucesso', data: result[0] });
};

module.exports = { criarProduto, listaProdutosUsuarios, deleteProduto, deleteProdutoLote, atualizarProduto };