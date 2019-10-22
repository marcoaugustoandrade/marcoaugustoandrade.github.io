---
layout: post
title: "Implementando uma API com Nodejs e MySQL para gerenciamento de tarefas"
date:   2019-09-03 10:52:00 -0400
categories: javascript
---

## Pré-requisitos
Para implementar este tutorial é necessário um editor de texto (estou utilizando o VS Code), [Git](https://git-scm.com/), [Nodejs](https://nodejs.org/en/) e [MariaDB](https://mariadb.org/). Também será utilizado o cURL, Postman e um navegador (Chrome ou Firefox).


## Baixando a estrutura básica
Faça um fork do repositório com a estrutura básica `https://github.com/marcoaugustoandrade/api-tarefas-default`

Clone seu repositório no GitHub em seu computador:
{% highlight bash %}
git clone https://github.com/<USUARIO>/api-tarefas-default
{% endhighlight %}


## Criando o projeto nodejs
Após clonar a estrutura básica acesse o diretório:
{% highlight bash %}
cd api-tarefas-default
{% endhighlight %}

Crie um projeto nodejs com o comando a seguir e, em seguida, responda os questionamentos:
{% highlight bash %}
npm init

package name: (api-tarefas-default)
version: (1.0.0)
description: API Tarefas v1
entry point: (index.js) src/index.js
test command:
git repository: (https://github.com/marcoaugustoandrade/api-tarefas-default.git)
keywords: tarefas
author: Marco Andrade
license: (ISC) MIT
{% endhighlight %}


## Instalando o expressjs
Para implementarmos uma API vamos utilizar o framework [Expressjs](https://expressjs.com/). Para utiliza-lo como dependência do projeto utilize o [NPM](https://www.npmjs.com/) (que é o gerenciador de pacotes do nodejs):
{% highlight bash %}
npm install --save express
{% endhighlight %}


Se abrir o arquivo `package.json` vai perceber que o expressjs agora faz parte das dependências deste projeto:
{% highlight javascript %}
"dependencies": {
    "express": "^4.17.1"
{% endhighlight %}


As dependências são instaladas na pasta `node_modules`. Esta pasta está listada no arquivo `.gitignore` e significa que eles serão ignorados pelo `Git`. Por exemplo, se você commitar, enviar estes commits para o repositório remoto e clonar este repositório em outra máquina, será necessário instalar as dependências. Como essas dependências estão listadas no arquivo `package.json` basta utilizar o seguinte comando dentro da pasta do projeto:
{% highlight bash %}
npm install
{% endhighlight %}


## Criando a aplicação e a primeira rota
Abra o arquivo `index.js` dentro da pasta `src`. Neste arquivo vamos criar a primeira rota de nossa API:
{% highlight javascript %}
// Importando o expressjs
const express = require('express')

// Criando uma instância do expressjs
const app = express()

// Criando uma rota
app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

// Configurando o servidor
const port = 3009
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
{% endhighlight %}


## Configurando o package.json
Antes de subir o servidor vamos editar o arquivo `package.json` adicionando um script para isso:
{% highlight javascript %}
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js"
}
{% endhighlight %}


## Subindo o servidor
No console utilize o comando a seguir para subir o servidor:
{% highlight bash %}
npm run start
{% endhighlight %}

Para testar abra no navegador com o seguinte endereço `http://localhost:3009/`.


## Adicionando uma nova rota
Vamos adicionar uma nova rota no arquivo `index.js`:
{% highlight javascript %}
// Criando uma nova rota
app.get('/api/v1', (req, res) => {
  res.json({
    message: "API Tarefas v1"
  })
})
{% endhighlight %}

Observe que agora estamos retornando um JSON. Abra o navegador e abra o endereço `http://localhost:3000/api/v1`. Percebeu que a rota não foi carregada? Para que as novas alterações possam funcionar precisamos parar o servidor com `CTRL + C` e novamente utilizar o comando `npm run start` para subi-lo. Para que toda vez que fizermos alterações não precisarmos deste procedimento vamos instalar o `Nodemon`, uma dependência que monitora as alterações parando e iniciando o servidor.


## Instalando o nodemon
Vamos instalar o `nodemon` de forma global:
{% highlight bash %}
sudo npm install -g nodemon
{% endhighlight %}

Também vamos editar o `package.json` para que o nodemon seja utilizado no comando que sobe o servidor:
{% highlight bash %}
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/index.js"
}
{% endhighlight %}


## Importando o schema do banco de dados
Antes de continuarmos vamos preparar o banco de dados da API. Acesse o SGDB com o comando:
{% highlight bash %}
sudo mysql -u root -p
{% endhighlight %}

{% highlight javascript %}
// Criando um usuário para uso da API
create user 'suporte'@'localhost' identified by '$uportE99';

// Concedendo privilégios
grant all privileges on db_tarefas.* to 'suporte'@'localhost';

// Saindo do SGDB
exit

// Importando o schema do banco de dados
mysql -u suporte -p < database/schema.sql
{% endhighlight %}


## Criando o módulo de rotas
Vamos organizar nosso projeto criando um módulo para as rotas. Dentro da pasta `src` crie a pasta `routes` e, dentro desta pasta, crie o arquivo `tarefaRouter.js`. Neste arquivo vamos listar todas as rotas do recurso `tarefa`:
{% highlight javascript %}
const express = require('express')
const router = express.Router()

// Exportando as rotas
module.exports = router

Abra o `index.js` para que possamos importar as rotas do recurso `tarefa`:
const express = require('express')
const app = express()

app.get('/api/v1', (req, res) => {
  res.json({
    message: "API Tarefas v1.0"
  })
})

// Rotas
const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const port = 3000
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
{% endhighlight %}

A rota /api/v1/tarefas utiliza o módulo `tarefaRouter` que contém todas as rotas do recurso `tarefa`.


## Criando uma rota para listar todas as tarefas
Vamos criar a primeira rota que será responsável por listar todas as tarefas. Vamos adicionar as rotas no arquivo `src/routes/tarefaRouter`:
{% highlight javascript %}
const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')

// Lista de rotas
router.get('/', tarefaController.listar)

module.exports = router
{% endhighlight %}

Ao utilizar a rota `/api/v1/tarefas` com o método `GET` vamos direcionar o processamento para a função `listar` do módulo `tarefaController`.

Na pasta `src` vamos criar a pasta `controllers` e, dentro desta, criar o módulo `tarefaController`. Este módulo será responsável pelo processamento das rotas do recurso `tarefa`.
{% highlight javascript %}
exports.listar = (req, res) => {
  res.json({
    message: "Listando tarefas!"
  })
}
{% endhighlight %}

A partir de agora vamos utilizar o Postman para realizar os testes em nossa API.


## Variáveis de ambiente
No arquivo `index.js` temos uma variável `port` destinada a armazenar a porta utilizada pelo servidor de nossa API. Provavelmente, vamos ter outras variáveis para acesso a banco de dados espalhadas por nosso código. Como forma de organizar vamos utilizar uma dependência para controlar nossas variáveis de ambiente:
{% highlight bash %}
npm install --save dotenv
{% endhighlight %}

As variáveis ficarão localizadas no arquivo .env. Por questões de segurança este arquivo faz parte da lista ignorada de arquivos do `.gitignore`. Há um arquivo de exemplo `.env.example`, listado na raiz do projeto. Faça uma cópia deste arquivo com o nome .env e edite conforme suas configurações:
{% highlight bash %}
# App
PORT=3009

# MariaDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=suporte
DB_PASS=$uportE99
DB_NAME=db_tarefas
{% endhighlight %}

No arquivo `index.js` vamos importar e configurar a dependência `dotenv`:
{% highlight javascript %}
const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
{% endhighlight %}

Observe que para acessar as variáveis de ambiente do arquivo `.env` basta utilizar `process.env.NOME-DA-VARIAVEL`.


## Registrando logs com o Morgan
Para auxiliar no processo de debug da nossa API vamos instalar uma dependência para gerenciar os logs:
{% highlight bash %}
npm install --save morgan
{% endhighlight %}

No arquivo `index.js` vamos importa-la e configura-la:
{% highlight javascript %}
const morgan = require('morgan')
app.use(morgan('dev'))
{% endhighlight %}

Há várias opções para uso no [morgan](https://www.npmjs.com/package/morgan) como: tiny, combined, etc.

O módulo principal vai ficar assim:
{% highlight javascript %}
const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
{% endhighlight %}


## Acessando o banco de dados
Na pasta `src` crie uma pasta `config` e um arquivo denominado `conexao.js`. Neste módulo vamos criar uma conexão com o banco de dados e exporta-la:
{% highlight javascript %}
const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = conexao;
{% endhighlight %}

Perceba que este módulo necessita da dependência `mysql`. Para instalar utilize o comando:
{% highlight bash %}
npm install --save mysql
{% endhighlight %}


## Carregando a documentação da API
Devemos implementar a nossa API de acordo com a especificação contida na pasta `docs`. Para isso, vamos instalar algumas dependências:
{% highlight bash %}
npm install --save swagger-ui-express
npm install --save yamljs
{% endhighlight %}

No módulo principal vamos adicionar a implementação que carrega a documentação da API na rota `/api/v1/docs`:
{% highlight javascript %}
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yml')
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
{% endhighlight %}


## Listando todas as tarefas
Para efetivamente listar as tarefas registradas no banco de dados vamos editar a função `listar` do módulo `tarefaController`:
{% highlight javascript %}
// Se vamos acessar um banco de dados precisamos do módulo que faz isso
const conexao = require('../config/conexao')

exports.listar = (req, res) => {
 
  let descricao = req.query.f || ""
  descricao = "%" + descricao + "%"

  const query = 'select t.id, t.descricao, t.data, t.realizado, c.descricao as categoria, c.cor from tarefas t, categorias c where t.categoria_id = c.id and t.descricao like ?'

  conexao.query(query, [descricao], (err, rows) => {
    if (err){
      console.log(err)
      res.status(500)
      res.json({"message": "Internal Server Error"})
    } else if (rows.length > 0){
      res.status(200)
      res.json(rows)
    } else {
      res.status(404)
      res.json({"message": "Nenhuma tarefa cadastrada para esta busca"})
    }
  })
}
{% endhighlight %}

## Listando uma tarefa atráves do seu id
Sempre que precisarmos implementar uma nova rota é necessário cria-la no módulo `tarefaRouter` e implementa-la no módulo `tarefaController`.
{% highlight javascript %}
const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')

router.get('/', tarefaController.listar)
router.get('/:id', tarefaController.listarPorId)

module.exports = router
{% endhighlight %}

No módulo `tarefaController` vamos implementar a função `listarPorId`:
{% highlight javascript %}
exports.listarPorId = (req, res) => {
     
  const id = req.params.id

  const query = 'select * from tarefas where id = ?'

  conexao.query(query, [id], (err, rows) => {
    if (err){
      console.log(err)
      res.status(500)
      res.json({"message": "Internal Server Error"})
    } else if (rows.length > 0){
      res.status(200)
      res.json(rows[0])
    } else {
      res.status(404)
      res.json({"message": "Nenhuma tarefa cadastrada com esse id"})
    }
  })
}
{% endhighlight %}

Para testar no Postman crie um novo `request` com o método `DELETE` para a url `http://localhost:3009/api/v1/tarefa/1`.


## Inserindo uma nova tarefa
Para inserir uma nova tarefa vamos utilizar o método `POST` e enviar, no corpo da requisição, os dados de uma tarefa para cadastro. Assim, precisamos instalar a dependência `body-parser`:
{% highlight bash %}
npm install --save body-parser
{% endhighlight %}

E utiliza-la no arquivo `index.js`:
{% highlight javascript %}
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
{% endhighlight %}

Vamos aproveitar e instalar a dependência `cors`. Esta dependência habilita o uso da API por domínios diferentes:
{% highlight bash %}
npm install --save cors
{% endhighlight %}

E utiliza-la no arquivo `index.js`:
{% highlight javascript %}
const cors = require('cors')

app.use(cors());
{% endhighlight %}

O módulo principal vai ficar assim:
{% highlight javascript %}
const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
const cors = require('cors')

app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
{% endhighlight %}

Vamos criar a rota para inserção de novas tarefas. No arquivo `tarefaRouter` insira a rota:
{% highlight javascript %}
router.post('/', tarefaController.inserir)
{% endhighlight %}

No módulo `tarefaController` vamos criar a função `inserir`:
{% highlight javascript %}
exports.inserir = (req, res) => {
 
  const tarefa = {}
  tarefa.descricao = req.body.descricao
  tarefa.data = req.body.data
  tarefa.realizado = req.body.realizado
  tarefa.categoria_id = req.body.categoria_id
 
  const query = 'insert into tarefas (descricao, data, realizado, categoria_id) values (?, ?, ?, ?)'
 
  conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id], (err, result) => {
    if (err){
      console.log(err)
      res.status(500)
      res.json({"message": "Internal Server Error"})
    } else {
      res.status(201)
      res.json({"message": result.insertId})
    }
  })
}
{% endhighlight %}

Utilize o postman para inserir uma nova tarefa.


## Alterando dados de uma tarefa
No módulo `tarefaRouter` vamos criar a rota do tipo `PUT` que será responsável pela alteração de recusos do tipo tarefa:
{% highlight javascript %}
router.put('/:id', tarefaController.alterar)
{% endhighlight %}

No módulo `tarefaController` vamos criar a função `alterar` que será responsável pela alteração de recursos do tipo tarefa:
{% highlight javascript %}
exports.alterar = (req, res) => {
 
    const tarefa = {}
    tarefa.id = req.params.id
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id

    const query = 'update tarefas set descricao = ?, data = ?, realizado = ?, categoria_id = ? where id = ?'

    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.realizado, tarefa.id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(202)
        res.json({"message": "Tarefa alterada"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
}
{% endhighlight %}

Utilize o Postman para alterar uma tarefa.


## Deletando uma tarefa
Para deletar uma tarefa vamos criar uma rota com o método `DELETE` informando o id da tarefa a ser excluída. No módulo `tarefaRouter` crie a rota:
{% highlight javascript %}
router.delete('/:id', tarefaController.deletar)
{% endhighlight %}

No módulo `tarefaController` vamos criar a função `deletar` que será responsável pela exclusão de recursos do tipo tarefa:
{% highlight javascript %}
exports.deletar = (req, res) => {
 
  const id = req.params.id

  const query = 'delete from tarefas where id = ?'

  conexao.query(query, [id], (err, result) => {
    if (err){
      console.log(err)
      res.status(500)
      res.json({"message": "Internal Server Error"})
    } else if (result.affectedRows > 0){
      res.status(200)
      res.json({"message": "Tarefa deleta"})
    } else {
      res.status(404)
      res.json({"message": "Tarefa não encontrada"})
    }
  })
}
{% endhighlight %}

Observer que temos três tipos de respostas: quando há algum erro no servidor, quando a tarefa foi deletar e quando a tarefa informada não foi encontrada.

Para testar no Postman crie um novo `request` com o método `DELETE` para a url `http://localhost:3009/api/v1/tarefa/1`. Tente novamente executar a solicitação para a exclusão da tarefa 1 e veja o `response`.


## Implementando a autenticação e autorização com JWT
Até o momento a API tem acesso público e qualquer um pode acessa-la e utiliza-la e apartir de agora vamos implementar mecanismos de autenticação e autorização.

Instale as dependências:
{% highlight bash %}
npm install --save jsonwebtoken
npm install --save bcrypt
{% endhighlight %}

Crie o modulo `apiRouter` na pasta `src/routers`. Neste módulo vamos implementar duas rotas uma para login e uma para logoff:
{% highlight javascript %}
const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')

router.post('/login', apiController.login)
router.get('/logoff', apiController.logoff)

module.exports = router
{% endhighlight %}

Agora vamos implementar o módulo `apiController` na pasta `src/controllers`.
{% highlight javascript %}
// Importações necessárias
const conexao = require('../config/conexao')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
{% endhighlight %}

Função para realizar login:
{% highlight javascript %}
exports.login = (req, res) => {

  const email = req.body.email
  const senha = req.body.senha

  const query = 'select * from usuarios where email = ?'

  conexao.query(query, [email], (err, rows) => {

    if (err){        
      console.log(err)
      res.status(500)
      res.json({
        auth: false,
        "message": "Internal Server Error"
      })
   
    } else if (rows.length > 0){
      bcrypt.compare(senha, rows[0].senha, (err, resp) => {
        if (resp){
          const usuario = rows[0].id
          jwt.sign({usuario}, process.env.SECRET, {expiresIn: 30}, (err, token) => {
            res.status(200)
            res.json({
              auth: true,
              token: token
            })
          })
        } else {

          res.status(403)
          res.json({
            auth: false,
            message: "E-mail e/ou senhas incorreto(s)"
          })
        }
      })
    } else {
      res.status(403)
      res.json({
        auth: false,
        message: "E-mail e/ou senhas incorreto(s)"
      })
    }
  })
}
{% endhighlight %}

Função para verificar se há autorização para uso de um recurso:
{% highlight javascript %}
exports.verificar = (req, res, next) => {

  const token = req.headers['access-token']
 
  if (!token){
    res.status(401)
    res.send({
      auth: false,
      message: 'O token está em branco'
    })
  }
 
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
   
    if (err){
      res.status(500)
      res.send({
        auth: false,
        message: 'Falha de autenticação'
      })
    } else {
      next()
    }
  })
}
{% endhighlight %}

Função para realizar logoff:
{% highlight javascript %}
exports.logoff = (req, res) => {
  res.status(200)
  res.send({
    auth: false,
    token: null
  })
}
{% endhighlight %}

O próximo passo é editar as rotas do recurso tarefa para que verifiquem as autorizações:
{% highlight javascript %}
const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')
const apiController = require('../controllers/apiController')

// Lista de rotas
router.get('/', apiController.verificar, tarefaController.listar)
router.get('/:id', apiController.verificar, tarefaController.listarPorId)
router.post('/', apiController.verificar, tarefaController.inserir)
router.put('/:id', apiController.verificar, tarefaController.alterar)
router.delete('/:id', apiController.verificar, tarefaController.deletar)

module.exports = router
{% endhighlight %}


## Validando dados com express-validator
Instale a dependência `express-validator`:
{% highlight bash %}
npm install --save express-validator
{% endhighlight %}

Dentro da pasta `src` crie a pasta `util`. Nesta pasta crie o arquivo `tarefaValidation.js`. No `tarefaValidation.js` vamos importar o `express-validator`:
{% highlight javascript %}
const { check } = require('express-validator')
{% endhighlight %}

Agora vamos exportar uma constante que contém as regras de validação que serão utilizadas na rota que lista as tarefas por id. A validação consiste em verificar se o `id` foi setado e se é numérico, retornando uma string para o caso negativo a algumas dessas verificações:
{% highlight javascript %}
exports.listarPorId = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico')
]
{% endhighlight %}


Vamos modificar nossa rota que lista tarefas por id para que utilize a validação que criamos. Abra o arquivo `src\routes\tarefaRoute.js`:
{% highlight javascript %}
// Importando o arquivo de validação
const tarefaValidation = require('../util/tarefaValidation')

// Utilizando as regras de validação na rota que lista por id
router.get('/:id', tarefaValidation.listarPorId, tarefaController.listarPorId)
{% endhighlight %}

No controller vamos utilizar a validação para retornar adequadamente os erros de validação:
{% highlight javascript %}
exports.listarPorId = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    
    const id = req.params.id

    const query = 'select * from tarefas where id = ?'

    conexao.query(query, [id], (err, rows) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (rows.length > 0){
        res.status(200)
        res.json(rows[0])
      } else {
        res.status(404)
        res.json({"message": "Nenhuma tarefa cadastrada com esse id"})
      }
    })
  }
}
{% endhighlight %}

Já sabemos criar validações dos dados de entrada na API, então iremos adicionar validações para as operações de inserir, alterar e deletar tarefas. Abra o arquivo `src\util\tarefaValidation.js`, que deve ficar da seguinte forma:
{% highlight javascript %}
const { check } = require('express-validator')

exports.listarPorId = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico')
]

exports.inserir = [
  check('descricao').exists().trim().withMessage('A descrição da tarefa não pode estar em branco'),
  check('data').exists().trim().withMessage('O horário e data da tarefa não pode estar em branco'),
  check('categoria_id').exists().trim().withMessage('A categoria da tarefa deve ser definida')
]

exports.alterar = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico'),
  check('descricao').exists().trim().withMessage('A descrição da tarefa não pode estar em branco'),
  check('data').exists().trim().withMessage('O horário e data da tarefa não pode estar em branco'),
  check('categoria_id').exists().trim().withMessage('A categoria da tarefa deve ser definida')
]

exports.deletar = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico')
]
{% endhighlight %}

Abra o arquivo de rotas, localizado em `src\routes\tarefaRoute.js`, que deve ser alterado para ficar assim:
{% highlight javascript %}
const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')
const tarefaValidation = require('../util/tarefaValidation')

router.get('/', tarefaController.listar)
router.get('/:id', tarefaValidation.listarPorId, tarefaController.listarPorId)
router.post('/', tarefaValidation.inserir, tarefaController.inserir)
router.put('/:id', tarefaValidation.alterar, tarefaController.alterar)
router.delete('/:id', tarefaValidation.deletar, tarefaController.deletar)

module.exports = router
{% endhighlight %}

Por fim, abra o arquivo de controllers, em `src\controllers\tarefaController.js`, e altere os métodos `inserir`, `alterar` e `deletar`:
{% highlight javascript %}
exports.inserir = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    
    const tarefa = {}
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id
    
    const query = 'insert into tarefas (descricao, data, realizado, categoria_id) values (?, ?, ?, ?)'
    
    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else {
        res.status(201)
        res.json({"message": result.insertId})
      }
    })
  }
}

exports.alterar = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {

    const tarefa = {}
    tarefa.id = req.params.id
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id

    const query = 'update tarefas set descricao = ?, data = ?, realizado = ?, categoria_id = ? where id = ?'

    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.realizado, tarefa.id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(202)
        res.json({"message": "Tarefa alterada"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
    conexao.end()
  }
}

exports.deletar = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    
    const id = req.params.id

    const query = 'delete from tarefas where id = ?'

    conexao.query(query, [id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(200)
        res.json({"message": "Tarefa deleta"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
  }
}
{% endhighlight %}
