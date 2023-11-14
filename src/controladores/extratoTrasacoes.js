const pool = require('../conexao');

const extratoTransacao = async (req, res) => {
    req.userId = req.usuario.id
    try {
        const resultadoEntrada = await pool.query(`
            SELECT SUM(valor) as total 
            FROM transacoes 
            WHERE usuario_id = $1 AND tipo = 'entrada'
        `, [req.userId]);

        const resultadoSaida = await pool.query(`
            SELECT SUM(valor) as total 
            FROM transacoes 
            WHERE usuario_id = $1 AND tipo = 'saida'
        `, [req.userId]);

        const entrada = resultadoEntrada.rows[0].total || 0;
        const saida = resultadoSaida.rows[0].total || 0;

        res.status(200).json({
            entrada,
            saida
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter extrato.' });
    }
};

module.exports = extratoTransacao