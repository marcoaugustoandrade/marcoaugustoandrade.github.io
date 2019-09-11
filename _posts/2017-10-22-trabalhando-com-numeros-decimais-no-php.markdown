---
layout: post
title: "Formatando números decimais no PHP"
date:   2017-10-22 23:21:53 -0400
categories: php
---

Os bancos de dados armazenam os números no formato americano, com a separação das casas decimais utilizando uma vírgula (,) e das unidades de milhar utilizando o ponto (.).

Formato americano: `1,234.56`

Aqui no Brasil nós utilizamos o ponto (,) para separação das casas decimais e o ponto (.) para separação das unidades de milhar.

Formato brasileiro: `1.234,56`

Então, se uma varíavel $numero receber do banco de dados um valor de uma coluna que seja do tipo decimal (ou float/double), podemos utilizar a função do PHP `number_format` para deixar o número no formato que utilizamos por aqui, indicando: 1º) o valor a ser formatado, 2º) a precisão (quantidade de casas decimais que serão mostradas), 3º)o separador de casas decimais e 4º) o separador de milhar.

{% highlight php %}
$numero = 1234.56;
$numero = number_format($numero, 2, ',', '.');
echo $numero;
>> 1.234,56
{% endhighlight %}

Quando criamos, por exemplo, um formulário em HTML o usuário vai informar os números utilizando o formato brasileiro, algo como 1.234,56 e você vai precisar trata-lo para inserir corretamente no banco de dados, que utiliza o formato americano.

O macete aqui é fazer duas substituições com a função do PHP `str_replace`, primeiro removendo os pontos e depois trocando as vírgulas por pontos, ou seja, separando as casas decimais por ponto. 

{% highlight php %}
$numero = "1.234,56";
$numero = str_replace(',','.',str_replace('.','',$numero));
echo $numero;
>> 1234.56
{% endhighlight %}