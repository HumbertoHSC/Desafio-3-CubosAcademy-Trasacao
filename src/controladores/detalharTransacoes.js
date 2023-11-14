const pool = require('../conexao');

const detalharTransacao = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.usuario.id

        const query = `
        SELECT t.*, c.descricao as categoria_nome 
        FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id 
        WHERE t.id = $1 AND t.usuario_id = $2
    `
        const resultado = await pool.query(query, [id, userId]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar transação.' });
    }
};

module.exports = detalharTransacao