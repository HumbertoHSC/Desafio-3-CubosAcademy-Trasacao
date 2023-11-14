const express = require('express');
const rotas = express();

const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
const autenticacao = require('./intermediarios/autenticacao');
const detalhar = require('./controladores/detalharUsuario');
const atualizar = require('./controladores/atualizarUsuario');
const listar = require('./controladores/listarCategorias');

const extratoTransacao = require('./controladores/extratoTransacoes')
const listarTransacoes = require('./controladores/listarTransacoes')
const detalharTransacao = require('./controladores/detalharTransacoes')
const cadastrarTransacao = require('./controladores/cadastrarTransacoes')
const editarTransacoes = require('./controladores/editarTransacoes')
const excluirTransacao = require('./controladores/excluirTransacoes')

rotas.post('/usuario', cadastro);
rotas.post('/login', login);

rotas.use(autenticacao);

rotas.get('/usuario', detalhar);
rotas.get('/categoria', listar);

rotas.put('/usuario', atualizar);

rotas.get('/transacao/extrato', extratoTransacao)
rotas.get('/transacao', listarTransacoes)
rotas.get('/transacao/:id', detalharTransacao)
rotas.post('/transacao', cadastrarTransacao)
rotas.put('/transacao/:id', editarTransacoes)
rotas.delete('/transacao/:id', excluirTransacao)

module.exports = rotas;