const express = require('express');
const router = express.Router();
const consultarNCM = require('../utils/apiNCM');

router.get('/ncm', async (req, res) => {
    try {
        const jsonData = await consultarNCM();
        res.json(jsonData);
    } catch (error) {
        console.error('Erro ao consultar o JSON:', error);
        res.status(500).json({ error: 'Erro ao consultar o JSON.' });
    }
});

module.exports = router;
