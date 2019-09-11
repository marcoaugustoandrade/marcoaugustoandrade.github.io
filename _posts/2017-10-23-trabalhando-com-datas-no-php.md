---
layout: post
title: "Formatando datas no PHP"
date:   2017-10-23 08:48:00 -0400
categories: php
---

Os bancos de dados armazenam datas no formato `Y-m-d`, fornecendo algo como 2017-10-23, o que não é muito agradável ao exibir ao usuário que está acostumado com o formato `d/m/Y` (23/10/2017).

Para formatar a data podemos utilizar a função do PHP `date`, passando como parâmetro o formato que queremos exibir e o valor da coluna do banco de dados.

{% highlight php %}
$data_inicio = "2017-10-23";
echo date("d/m/Y", strtotime($data_inicio));
>> 23/10/2017
{% endhighlight %}

Da mesma forma utilizamos a função do PHP `date` para formatar a data recebida, de um formulário HTML, por exemplo, e prepara-lá para inserção no banco de dados.

{% highlight php %}
$data_inicio = "23/10/2017";
echo date("Y-m-d", strtotime($data_inicio));
>> 2017-23-10
{% endhighlight %}