---
layout: post
title: "Tutorial: desenvolvendo um app para cálculo de IMC com JavaScript"
date:   2019-09-03 10:52:00 -0400
categories: javascript
---


Faça o fork do [repositório](https://github.com/marcoaugustoandrade/imc-default) contendo os arquivos necessários para este tutorial.

Vamos importar o arquivo `assets/js/functions.js` em nosso documento HTML:
{% highlight html %}
<script src="assets/js/functions.js"></script>
{% endhighlight %}

Agora abra o arquivo `assets/js/functions.js` para programar o aplicativo para cálculo de IMC.

## Mapeando os componentes do formulário
Para manipular os dados dos campos dos formulários vamos mapea-los:
{% highlight javascript %}
let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");
{% endhighlight %}

## Adicionando um listerner no botão para calcular o IMC
A ideia é que após o botão calcular seja clicado, e com os dados dos campos do formulário, o cálculo de IMC ocorra: 
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  console.log("Cliquei no botão");
});
{% endhighlight %}

Você vai perceber que ao clicar no botão o formulário é submetido. Assim, devemos utilizar a função `preventDefault()` para que o formulário não seja submetido:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  // Após testar remova essa impressão no console
  console.log("Cliquei no botão");
});
{% endhighlight %}

## Criando uma função para calcular o IMC
Vamos criar uma função para calcular o IMC:
{% highlight javascript %}
function calcularIMC(peso, altura){
  return peso / (altura * altura);
}
{% endhighlight %}

Vamos utilizar a função para cálculo de IMC no event listerner do botão:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  // Após testar remova essa impressão no console
  console.log(imc);
});
{% endhighlight %}

Para definir a quantidade de casas decimais utilizamos o método `toFixed()`:
{% highlight javascript %}
  console.log(imc.toFixed(2));
{% endhighlight %}

## Adicionando os dados na tabela
Primeiro vamos mapear a tabela:
{% highlight javascript %}
let tabela = document.querySelector('.table');
{% endhighlight %}

E então criar uma função para adicionar dados na tabela: 
{% highlight javascript %}
function addTabela(nome, peso, altura, imc){
  
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  let colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc;

  let colunaDeletar = document.createElement('td');
  let btnDeletar = document.createElement('button');
  btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');  
  colunaDeletar.appendChild(btnDeletar);

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaDeletar);

  tabela.appendChild(linha);
}
{% endhighlight %}

Modificando o event listerner do botão para cálculo de IMC para que, além de calcular o IMC, adicione os dados na tabela:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addTabela(nome.value, peso.value, altura.value, imc.toFixed(2));
});
{% endhighlight %}


## Limpando o form
Após adicionar os dados na tabela precisamos limpar o formulário para receber novos dados:
{% highlight javascript %}
function limparFormulario(){
  nome.value = '';
  peso.value = '';
  altura.value = '';
  // Também vamos setar o focus para o campo nome
  nome.focus();
}
{% endhighlight %}

Modificando o event listerner do botão para cálculo de IMC para que, além de calcular o IMC, limpe o formulário:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addTabela(nome.value, peso.value, altura.value, imc.toFixed(2));
  limparFormulario();
});
{% endhighlight %}

## Criando uma função para persistir os dados no LocalStorage
Os dados adicionados na tabela são descartados quando fechamos a aba ou o navegador. Assim, vamos utilizar o LocalStorage para persistir esses dados. Vamos criar uma função que faça essa persistência:
{% highlight javascript %}
function addLocalStorage(nome, peso, altura, imc){

  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  
  } else {

    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }
}
{% endhighlight %}

Vamos modificar o event listerner do botão para calcular o IMC, limpar o formulário e adicionar os dados no LocalStorage. Perceba que não vamos mais adicionar os dados diretamente na tabela:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  // addTabela(nome.value, peso.value, altura.value, imc);
  limparFormulario();
});
{% endhighlight %}

Para testar se os dados estão sendo persistidos no LocalStorage abra o `inspetor` do navegador e vá na aba `Application`. Abra `LocalStorage`.


## Criando uma função para carregar os dados do LocalStorage na tabela:
Agora que temos uma função para adicionar no LocaStorage vamos criar uma função para carregar os dados do LocalStorage e montar nossa tabela:
{% highlight javascript %}
function carregarLocalStorage(){
  
  limparTabela();

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });
  }
}
{% endhighlight %}

Como declaramos uma função para limpar os dados da tabela precisamos codifica-la:
{% highlight javascript %}
function limparTabela(){
  let qtdLinhas = tabela.rows.length;
  for (let i = qtdLinhas - 1; i > 0; i--){
    tabela.deleteRow(i);
  }
}
{% endhighlight %}

Vamos modificar o event listerner do botão para calcular o IMC, limpar o formulário, adicionar os dados no LocalStorage, bem como, carregar os dados do LocalStorage para a tabela:
{% highlight javascript %}
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  carregarLocalStorage();
  limparFormulario();
});
{% endhighlight %}

Também precisamos executar a função `carregarLocalStorage()` quando a página for (re)carregada. No final do arquivo `index.html` chame a função:
{% highlight javascript %}
<script>
  carregarLocalStorage();
</script>
{% endhighlight %}


## Deletando dados
Vamos criar uma função para que, ao clicar no botão de deleção, os dados sejam deletados do LocalStorage:
{% highlight javascript %}
function deletarLinha(index){
  
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();
}
{% endhighlight %}

Também devemos colocar um `event listerner` em cada botão de deleção. Para isso vamos modificar a função `addTabela()`:
{% highlight javascript %}
function addTabela(nome, peso, altura, imc, indice){
  
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  let colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc.toFixed(2);

  let colunaDeletar = document.createElement('td');
  let btnDeletar = document.createElement('button');
  btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');
  
  // Adicionando um event listerner
  btnDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    deletarLinha(indice);
  });
  
  colunaDeletar.appendChild(btnDeletar);

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaDeletar);

  tabela.appendChild(linha);
}
{% endhighlight %}


## Adicionando mensagens
Para adicionar mensagens para o usuário vamos mapear a `div` que vai recebe-las:
{% highlight javascript %}
let mensagem = document.querySelector("#mensagem");
{% endhighlight %}

E implementar uma função para mostrar as mensagens:
{% highlight javascript %}
function mostrarMensagem(msg, tipo){
  
  mensagem.innerHTML = msg;
  mensagem.classList.add("d-block");

  if (tipo == 'add'){
    mensagem.classList.add("alert-success");
  } else if (tipo == 'delete'){
    mensagem.classList.add("alert-danger");
  } else if (tipo == 'table'){
    mensagem.classList.add("alert-warning");
  }

  setTimeout(() => {
    mensagem.innerHTML = "";
    mensagem.classList.remove("alert-danger");
    mensagem.classList.remove("alert-success");
    mensagem.classList.remove("alert-warning");
    mensagem.classList.remove("d-none");
  }, 2000);
}
{% endhighlight %}

Vamos adicionar uma mensagem para avisar que um dado foi gravado no LocalStorage:
{% highlight javascript %}
function addLocalStorage(nome, peso, altura, imc){

  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  
  } else {

    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }

  // Utilizando a função para mostrar a mensagem que o dado foi gravado no LocalStorage
  mostrarMensagem("IMC cadastrado!", "add");
}
{% endhighlight %}

Também vamos adicionar uma mensagem para avisar que um dado foi deletado do LocaStorage:
{% highlight javascript %}
function deletarLinha(index){
  
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();

  // Utilizando a função para mostrar a mensagem que o dado foi removido do LocalStorage
  mostrarMensagem("IMC deletado!", "delete");
}
{% endhighlight %}

Por fim, vamos mostrar uma mensagem caso a tabela não tenha dados:
{% highlight javascript %}
function carregarLocalStorage(){
  
  limparTabela();

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });

  } else {

    // Utilizando a função para mostrar que não há dados no LocalStorage
    mostrarMensagem("Nenhum IMC a ser exibido", "table");
  }
}
{% endhighlight %}


