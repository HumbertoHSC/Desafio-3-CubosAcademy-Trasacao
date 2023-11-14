const pool = require('../conexao');

const detalhar = async (req, res) => {
	try {
		const userId = req.usuario.id;

		const query = 'select id, nome, email from usuarios where id = $1';

        const usuario = await pool.query(query, [userId]);
	
		return res.json(usuario.rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = detalhar;