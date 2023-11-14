const pool = require('../conexao');

const editarTransacoes = async (req, res) => {
    req.userId = req.usuario.id
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json({ mensagem: 'Tipo inválido.' });
    }

    try {
        const resultadoTransacao = await pool.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [req.params.id, req.userId]);
        if (resultadoTransacao.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const resultadoCategoria = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);
        if (resultadoCategoria.rows.length === 0) {
            return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
        }

        await pool.query(`
            UPDATE transacoes 
            SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 
            WHERE id = $6
        `, [descricao, valor, data, categoria_id, tipo, req.params.id]);

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar transação.' });
    }
}

module.exports = editarTransacoes