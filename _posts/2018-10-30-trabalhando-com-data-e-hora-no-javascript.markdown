---
layout: post
title: "Trabalhando com data e hora no JavaScript"
date:   2018-10-30 13:38:00 -0400
categories: javascript
---


## Criando uma data a partir de um objeto date
{% highlight javascript %}
let hoje = new Date();
console.log(hoje);
{% endhighlight %}

Observe o padrão da data criada pelo objeto date:
{% highlight javascript %}
Tue Oct 30 2018 13:17:10 GMT-0400 (Amazon Standard Time)
{% endhighlight %}


## Definindo uma data
O formato de definição de um objeto date é o seguinte:
{% highlight javascript %}
new Date(ano, mês, dia, hora, minuto, segundo, milisegundo);
{% endhighlight %}

Caso seja necessário definir uma data podemos fazer da seguinte forma:
{% highlight javascript %}
let pagamento = new Date(2018, 10, 3);
{% endhighlight %}
Obs.: O mês é contado a partir de 0, assim, o valor 10 refere-se a novembro.

O exemplo a seguir também definir uma data com horário:
{% highlight javascript %}
let consulta = new Date(2018, 10, 3, 13, 30, 00);
{% endhighlight %}


## Selecionando o ano de um objeto date
{% highlight javascript %}
hoje.getDate();
{% endhighlight %}


## Selecionando o mês de um objeto date
Em um objeto date os meses são numerados a partir de 0, sendo assim, para imprimir corretamente o mês é necessário somar 1, veja:
{% highlight javascript %}
hoje.getMonth() + 1;
{% endhighlight %}


## Selecionando o dia de um objeto date
{% highlight javascript %}
hoje.getFullYear();
{% endhighlight %}


## Imprimindo uma data no formato utilizado no Brasil:
No exemplo a seguir vamos selecionar dia, mês e ano de uma data e concotenar com '\' para imprimir uma data no formato do Brasil:
{% highlight javascript %}
let diaMesAno = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();
console.log(diaMesAno);
{% endhighlight %}


## Selecionando a hora de um objeto date
{% highlight javascript %}
hoje.getHours();
{% endhighlight %}


## Selecionando o minuto de um objeto date
{% highlight javascript %}
hoje.getMinutes();
{% endhighlight %}


## Selecionando o segundo de um objeto date
{% highlight javascript %}
hoje.getSeconds();
{% endhighlight %}


## Imprimindo um horário
Neste exemplo vamos concatenar o horário de uma determinada consulta:
{% highlight javascript %}
let horarioConsulta = consulta.getHours() + ':' + consulta.getMinutes() + ':' + consulta.getSeconds();
console.log(horarioConsulta);
{% endhighlight %}


## Milisegundos
Também é possível selecionar uma data em milisegundos, contados a partir das 00:00:00 de 1 de janeiro de 1970:
{% highlight javascript %}
hoje.getTime();
{% endhighlight %}


## Criando um helper
Para facilitar a manipulação de objetos date podemos criar funções. A seguir alguns exemplos.

Uma função que recebe um texto, no formato DD/MM/YYYY definindo data, e retorna o objeto date:
{% highlight javascript %}
function textoParaData(texto){
	let data = texto.split('/');
	return new Date(data[2], (data[1] - 1), data[0]);
}
textoParaData("28/10/2018");
{% endhighlight %}

Uma função que recebe um objeto date e retorna uma string formata como DD/MM/YYYY:
{% highlight javascript %}
function dataParaTexto(data){
	return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}
dataParaTexto(new Date());
{% endhighlight %}

Uma função que recebe um texto, no formato DD/MM/YYYY HH:MM:SS definindo data e horário, e retorna um objeto date:
{% highlight javascript %}
function textoParaDataHora(texto){
	let x = texto.split(' ');
	let data = x[0].split('/');
	let hora = x[1].split(':');
	return new Date(data[2], (data[1] - 1), data[0], hora[0], hora[1], hora[2]);
}
textoParaDataHora("30/10/2018 13:30:00");
{% endhighlight %}

Uma função que recebe um objeto date e retorna um texto no formato DD/MM/YYYY HH:MM:SS:
{% highlight javascript %}
function dataHoraParaTexto(data){
	return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
}
dataHoraParaTexto(new Date());
{% endhighlight %}

Uma função que recebe um objeto date e retorna somente o horário no formato HH:MM:SS:
{% highlight javascript %}
function horaParaTexto(data){
	return data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
}
horaParaTexto(new Date());
{% endhighlight %}
