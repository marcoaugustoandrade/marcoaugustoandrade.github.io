---
layout: post
title: "Manipulando o DOM"
date:   2018-10-30 10:18:00 -0400
categories: javascript
---

O Document Object Model é uma representação em memória dos objetos HTML e pode ser manipulado com CSS ou JavaScript.

## Criando um elemento
Vamos criar um elemento do tipo `div` e armazena-lo em uma variável para podermos manipulá-lo:
{% highlight javascript %}
let aviso = document.createElement('div');
{% endhighlight %}

## Adicionando um elemento no DOM
O elemento está criado, mas não está "anexado" a nenhum outro elemento. No exemplo a seguir vamos anexar o elemento criado ao body:
{% highlight javascript %}
document.querySelector('body').appendChild(aviso);
{% endhighlight %}

## Acessando as propriedades de um elemento
Para adicionar um conteúdo em forma de texto
{% highlight javascript %}
aviso.textContent = 'Usuário cadastrado com sucesso!';
{% endhighlight %}

Em alguns casos será necessário manipular o HTML contido no elemento:
{% highlight javascript %}
aviso.innerHTML = '<h1>Usuário cadastrado com sucesso!</h1>';
{% endhighlight %}

Ou remover o HTML contido no elemento:
{% highlight javascript %}
aviso.innerHTML = '';
{% endhighlight %}

É possível alterar os atributos do elemento assim:
{% highlight javascript %}
aviso.setAttribute('id', 'mensagem');
{% endhighlight %}

Definindo as classes CSS:
{% highlight javascript %}
aviso.className = 'msg msg-alerta';
{% endhighlight %}

Adicionando uma única classe:
{% highlight javascript %}
aviso.classList.add('bg-alerta');
{% endhighlight %}

Removendo uma única classe:
{% highlight javascript %}
aviso.classList.remove('bg-alerta');
{% endhighlight %}

Para modificar diretamente o CSS de um elemento;
{% highlight javascript %}
aviso.style.padding = '0.5em';
aviso.style.backgroundColor = '#2d89ef';
{% endhighlight %}

Observe que quando uma propriedade CSS contém dois nomes, como no caso de `background-color`, acessamos com a junção dos nomes, remoção do traço e com o segundo nome iniciando em maiúsculas: `backgroundColor`.

## Excluir um elemento
Para excluir basta utilizar o método `remove()`:
{% highlight javascript %}
aviso.remove();
{% endhighlight %}
