const pool = require('../conexao');
const bcrypt = require('bcrypt');

const atualizar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(401).json({ mensagem: 'O campo nome não foi informado!'});
    };

    if (!email) {
        return res.status(401).json({ mensagem: 'O campo email não foi informado!'});
    };

    if (!senha) {
        return res.status(401).json({ mensagem: 'O campo senha não foi informado!'});
    };

    try {
        const userId = req.usuario.id;

        const queryEmail = ('select * from usuarios where email = $1');

		const emailExistente = await pool.query(queryEmail, [email]);

		if (emailExistente.rowCount > 0) {
			return res.status(400).json({ mensagem: 'E-mail informado já está cadastrado' });
		};

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'update usuarios set nome = $2, email = $3, senha = $4 where id = $1';

		await pool.query(query, [userId, nome, email, senhaCriptografada]);

        return res.status(201).json({ mensagem: 'Usuario atualizado!' });

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};

};

module.exports = atualizar;