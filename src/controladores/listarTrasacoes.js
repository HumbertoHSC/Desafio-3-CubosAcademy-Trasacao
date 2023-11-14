const pool = require('../conexao');

const listarTransacoes = async (req, res) => {
    try {
        const { id } = req.usuario; 
        const query = `
            SELECT t.*, c.descricao as categoria_nome 
            FROM transacoes t 
            JOIN categorias c ON t.categoria_id = c.id 
            WHERE t.usuario_id = $1
        `;
        
        const resultado = await pool.query(query, [id]);

        res.status(200).json(resultado.rows); 
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar transações.' });
    }
};

module.exports = listarTransacoes