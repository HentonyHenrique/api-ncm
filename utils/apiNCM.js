const axios = require('axios');

async function consultarNCM() {
    try {
        // Passa o url do portal Siscomex que retorna um Json
        const response = await axios.get('https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json?perfil=PUBLICO');
        const jsonData = response.data;

        //Retorna os dados de Código e Descrição do json
        const result = jsonData.Nomenclaturas.map(item => ({
            codigo: item.Codigo,
            descricao: item.Descricao
        }));

        return result;
    } catch (error) {
        //Retorna um erro caso ocorra problemas na consulta
        throw new Error('Problema ao consultar URL:', error);
    }
}
//Exporta o módulo
module.exports = consultarNCM;
