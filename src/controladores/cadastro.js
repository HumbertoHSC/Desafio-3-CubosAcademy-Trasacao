const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
    req.userId = req.usuario.id
   const { descricao, valor, data, categoria_id, tipo } = req.body;

   if (!descricao || !valor || !data || !categoria_id || !tipo) {
       return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
   }

   if (tipo !== 'entrada' && tipo !== 'saida') {
       return res.status(400).json({ mensagem: 'Tipo inválido.' });
   }

   try {
       const resultadoCategoria = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);
       if (resultadoCategoria.rows.length === 0) {
           return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
       }

       const resultado = await pool.query(`
           INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
       `, [descricao, valor, data, categoria_id, req.userId, tipo]);

       const transacao = resultado.rows[0];
       transacao.categoria_nome = resultadoCategoria.rows[0].descricao;

       res.status(201).json(transacao);
   } catch (error) {
       res.status(500).json({ mensagem: 'Erro ao cadastrar transação.' });
   }
};

module.exports = cadastrarTransacao