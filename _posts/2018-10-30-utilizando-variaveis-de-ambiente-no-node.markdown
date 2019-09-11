---
layout: post
title: "Utilizando variáveis de ambiente no Node"
date:   2018-10-30 09:44:00 -0400
categories: node env
---

Há certas ocasiões que se faz necessário armazenar algumas informações utilizando variáveis de ambientes, como usuário e senha ou host de acesso a um banco de dados. Os principais Sistemas Operacionais, Linux, MacOS e Windows, possuem variáveis de ambiente compartilhadas para todas as aplicações, o que pode não ser interessante para armazenar variáveis sensíveis de uma aplicação, as quais você não queira compartilhar.

O node possui uma dependência para facilitar o uso de variáveis de ambiente na aplicação: o `dotenv`. Para instalar utilize o comando:
{% highlight javascript %}
npm install --save dotenv
{% endhighlight %}

Crie um arquivo `.env` para armazenar suas variáveis e coloque na raiz do projeto. A seguir, um exemplo de um arquivo `.env` armazenando variáveis para acesso a um banco de dados MySQL:
{% highlight env %}
HOST=localhost
PORT=3306
DATABASE=db_tarefas
USER=root
PASSWORD=XjjddYY877
{% endhighlight %}

Para acessar as variáveis declaradas no `.env` importe o `dotenv', assim:
{% highlight javascript %}
require('dotenv').config();
{% endhighlight %}

Finalmente, ao invés de armazenar dados em variáveis como, por exemplo, isso:
{% highlight javascript %}
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'suporte',
    password: 'Suporte99',
    database: 'db_tarefas'
});
{% endhighlight %}

Faça assim:
{% highlight javascript %}
const conexao = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});
{% endhighlight %}

Ou seja, sempre que precisar de uma variável armazenada no `.env` utilize `process.env.NOME-DA-VARIAVEL`.

Mas qual é a vantagem na utilização das variáveis de ambiente? Bom, além da organização, você não corre o risco de enviar informações sensíveis, como senhas, tokens, dentre outros, quando enviar seu projeto para alguém ou algum repositório público.

Por fim, também é muito comum que o seu arquivo `.env` seja colocado no `.gitignore` e que um arquivo `.env.example` seja criado como exemplo da configuração necessária. 
