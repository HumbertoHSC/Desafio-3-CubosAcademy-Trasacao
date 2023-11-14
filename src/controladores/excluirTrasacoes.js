const pool = require('../conexao');

const excluirTransacao = async (req, res) => {
    req.userId = req.usuario.id
    try {
        const resultado = await pool.query('DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2 RETURNING *', [req.params.id, req.userId]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir transação.' });
    }
};

module.exports = excluirTransacao