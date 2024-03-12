---

Consumindo API de NCM da Siscomex com NodeJS

O que é a NCM?
A Nomenclatura é um sistema ordenado que permite, pela aplicação de regras e procedimentos próprios, determinar um único código numérico para uma dada mercadoria. Esse código, uma vez conhecido, passa a representar a própria mercadoria.
A Nomenclatura Comum do Mercosul (NCM) é uma Nomenclatura regional para categorização de mercadorias adotada pelo Brasil, Argentina, Paraguai e Uruguai desde 1995, sendo utilizada em todas as operações de comércio exterior dos países do Mercosul.
A NCM toma por base o Sistema Harmonizado (SH), que é uma expressão condensada de "Sistema Harmonizado de Designação e de Codificação de Mercadorias" mantido pela Organização Mundial das Alfândegas (OMA), que foi criado para melhorar e facilitar o comércio internacional e seu controle estatístico.
Os idiomas oficiais da NCM são o português e o espanhol.
https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias/ncm

---

Primeiro, vamos iniciar nosso projeto.
npm init -y

---

A estrutura do nosso projeto será assim:
```
routes/
  apiRoutes.js
utils/
  apiNCM.js
index.js
package.json
```
---

Essas serão as dependências que utilizaremos no projeto:

```
npm install express --save
npm install axios
npm install body-parser
```
---

Primeiro vamos criar nosso arquivo utils/apiNCM.js

```
const axios = require('axios');

async function consultarNCM() {
    try {
        // Indica o url do portal Siscomex que retorna um Json
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

```
Em seguida, precisamos criar nossa rota para acessar nossa api em routes/apiRoutes.js:

```
const express = require('express');
const router = express.Router();
//Chamamos nosso módulo apiNCM.js
const consultarNCM = require('../utils/apiNCM');
//criamos a rota do tipo GET
router.get('/ncm', async (req, res) => {
    try {
        const jsonData = await consultarNCM();
        res.json(jsonData);
    } catch (error) {
        console.error('Erro ao consultar o URL:', error);
        res.status(500).json({ error: 'Erro ao consultar o URL});
    }
});

//Exportamos o módulo 

module.exports = router;
```
---

Por último, criaremos nosso arquivo principal, o index.js que fica na raiz do nosso projeto.

```
const express = require('express');
const bodyParser = require('body-parser');
//carregamos nossa rota
const apiRoutes = require('./routes/apiRoutes');

const app = express();
//indicamos a porta 3300 para rodar nosso servidor
const PORT = process.env.PORT || 3300;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware express
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```
---

Após isso, podemos acessar nossa rota pelo navegador. localhost:3300/api/ncm

---
