# ProjetoEstoque
![Badge versão do programa](https://img.shields.io/badge/version-1.0-9cf?style=for-the-badge "Version") 

## Descrição
O projetoEstoque consiste em um sistema de cadastro de produtos, contendo login de usuario, cadastro do produto no banco de dados. Desenvolvido em JavaScript no banco de dados Supabase, criado para estudos pessoais.


## Funcionalidades
O projetoEstoque oferece as seguintes funcionalidades:
- Capaz de fazer o cadastro de usuario/empresa.
- Estocar produtos desejados.
- Deletar e editar informações dos produtos do seu estoque.
- Exportar para uma planilha excel.

## 1º Fase do Projeto - BackEnd
Exemplos para se usar em ferramentas de teste de API (API Testing Tools) como Thunder Client, Postman, e etc.  
1. Registrar Usuario
- Metodo: POST
- URL: https://projetoweedshop.onrender.com/register
- Aba Body -> JSON:
```plaintext
{
  "email": "email-aqui",
  "password": "senha-aqui"
}
```
Essa é a primeira etapa, onde o usuario faz seu registro, que vai para o banco de dados para conseguir fazer seu login.

2. Login
- Método: POST
- URL: https://projetoweedshop.onrender.com/login
- Aba Body -> JSON:
```plaintext
{
  "email": "email-aqui",
  "password": "senha-aqui"
}
```
Nessa etapa, o usuario faz o seu login, com as mesmas informações que utilizou para se registrar.  
ALERTA IMPORTANTE: Na resposta vai aparecer o "access_token", copie o token inteiro sem as aspas para prosseguir.

3. Cadastro de Produto
- Método: POST
- URL: https://projetoweedshop.onrender.com/products
- Aba Headers/KEY: header/key-> Authorization || value-> Bearer SEU_TOKEN_AQUI
- Aba Body-> JSON:
```plaintext
{
  "nome": "Seu-Produto",
  "quantidade": 50,
  "data": "2026-03-04",
  "preco": 29.90
}
```
Para cadastrar seus produtos, voce ira precisar colocar no Headers/Key a autorização do seu token para conseguir cadastrar seu produto, que vai ficar linkado ao seu login. E após isso, colocar as informaçoes em body no padrao acima para conseguir cadastrar.

4. Ver seu estoque de produtos
- Método: GET
- URL: https://projetoweedshop.onrender.com/products/me
- Aba Headers/KEY: header/key-> Authorization || value-> Bearer SEU_TOKEN_AQUI  
Para ver seu estoque completo, siga os passos acima.

5. Editar Produto
- Método: PUT
- URL: https://projetoweedshop.onrender.com/products/ID_DO_PRODUTO
- Aba Headers/KEY: header/key-> Authorization || value-> Bearer SEU_TOKEN_AQUI
- Aba Body->JSON com apenas os campos que deseja alterar:
```plaintext
{
  "nome": "Produto Atualizado",
  "preco": 39.90
}
```
Para editar seu produto, irá utilizar o TOKEN no Headers/KEY, e o ID_DO_PRODUTO no URL, conseguindo na resposta dada ao ver a lista dos seus produtos. No body, irá colocar apenas as informações que deseja editar.

6. Deletar Produto
- Método: DELETE
- URL: https://projetoweedshop.onrender.com/products/ID_DO_PRODUTO
- Aba Headers/KEY: header/key-> Authorization || value-> Bearer SEU_TOKEN_AQUI  
Para deletar seu produto, irá utilizar o TOKEN no Headers/KEY, e colocar o ID_DO_PRODUTO no URL tambem, que ira conseguir na a resposta dada ao ver a lista dos seus produtos.

7. Deletar Produtos em Lotes
- Método: DELETE
- URL: https://projetoweedshop.onrender.com/products
- Aba Headers: header/key-> Authorization || value-> Bearer SEU_TOKEN_AQUI
- Aba Body->JSON:
```plaintext
{
  "ids": ["ID_1", "ID_2", "ID_3"]
}
```
Para deletar seus produtos em varias quantidade/lote, irá utilizar o TOKEN no Headers/KEY, e em body, seguir o modelo do exemplo acima substituindo "ID_1", "ID_2", "ID_3" pelos ids dos produtos que deseja deletar.

8. Deletar Usuário
- Método: DELETE
- URL: https://projetoweedshop.onrender.com/users/ID_DO_USUARIO  
Para deletar o usuário, precisa apenas adicionar o ID do usuário ao URL, conseguindo na linha 5 "id" ao fazer o login.
