const pool = require('../conexao');

const listar = async (req, res) => {
	try {
		const query = 'select * from categorias'

        const categorias = await pool.query(query);
	
		return res.json(categorias.rows);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = listar;