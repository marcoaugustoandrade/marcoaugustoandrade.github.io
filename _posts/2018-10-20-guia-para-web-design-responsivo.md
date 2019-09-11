---
layout: post
title: "Guia para Web Design Responsivo"
date:   2018-10-20 13:00:00 -0400
categories: html responsivo
---


O objetivo no uso de um web design responsivo é adaptar o site aos diferentes tamanhos de tela, de forma que o layout fique fluído.

## Layout fluído
O layout fluído é a principal técnica do design responsivo, onde utilizamos medidas flexíveis, como porcentagem, no lugar de px.

{% highlight html %}
<header class="cabecalho">
  Trabalhando com responsividade
</header>
<main class="conteudo">
  <section class="col1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Vitae unde reprehenderit aliquid veniam minus, consequatur ipsam explicabo architecto dolor maiores 
    magnam voluptatem aliquam ullam laudantium mollitia saepe magni ea autem?
  </section>
  <section class="col2">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Esse a odit rerum autem repellendus dicta rem ipsum ratione deserunt numquam!
    Consectetur possimus consequatur ullam ut itaque saepe quis quasi minus.
  </section>
</main>
{% endhighlight %}

Um exemplo utilizando larguras fixas:
{% highlight css %}
.cabecalho{
  background: blueviolet;
  width: 1200px;
}
.conteudo{
  background-color: violet;
  width: 1200px;
}
.col1, .col2{
  display: inline-block;
  width: 590px;
}
{% endhighlight %}

Agora redimensione a tela e veja que com uma tela menor o conteúdo não fica proporcionalmente distribuído, aparecendo uma barra de rolagem.

O mesmo exemplo utilizando larguras flexíveis:
{% highlight css %}
.cabecalho{
  background: blueviolet;
  width: 100%px;
}
.conteudo{
  background-color: violet;
  width: 100%px;
}
.col1, .col2{
  display: inline-block;
  width: 49%;
  white-space: normal;
}
{% endhighlight %}


## Unidades de medida

Também podemos utilizar % para definir o tamanho das fontes. Os valores são herdados hierarquicamente do elemento pai body.

{% highlight html %}
<body>
<main class="conteudo">
  <h1 class="titulo">Lorem ipsum dolor</h1>
  <p class="texto-principal">Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
    Totam voluptate sunt, hic, illo eos similique ab, praesentium doloremque quam inventore
     modi veritatis error. Eveniet quam odit ullam eaque voluptates. Deserunt!
  </p>
  <section class="secao-comentarios">
    <p class="texto-comentario">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <p class="texto-comentario">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </section>
</main>
</body>
{% endhighlight %}

{% highlight css %}
.conteudo{ font-size: 120%; }
.titulo{ font-size: 130%; }
.texto-principal{ font-size: 85%; }
.secao-comentario{ font-size: 85%; }
.texto-comentario{ font-size: 70%; }
{% endhighlight %}

O navegador utiliza como padrão o tamanho de fonte 16px para o body. Assim, o tamanho de fonte definido para a classe .conteudo é de 120% do body, ou seja, `19.2px`. O tamanho de fonte para a classe .titulo é de 130% do tamanho da classe .conteudo, ou seja, `20.8px`. O tamanho de fonte para a classe .texto-principal é de 85% da classe .conteudo, definindo `16.32px`. Para a classe .secao-comentario foi definido que seu tamanho de fonte será de 85% da classe .conteudo, definindo `16.32px`. Finalmente, para a classe .texto-comentario é definido um tamanho de 70% da classe .secao-comentarios, calculada anteriormente como 16.32px, definindo, então, `11.42px`;

Como alternativa, podemos utilizar a media `em`, veja:

{% highlight css %}
.conteudo{ font-size: 1.2em; }
.titulo{ font-size: 1.3em; }
.texto-principal{ font-size: 0.85em; }
.secao-comentario{ font-size: 0.85em; }
.texto-comentario{ font-size: 0.70em; }
{% endhighlight %}

Também podemos utlizar a medida `rem` que define o font-size em relação ao elemento pai (body), não respeitando a hierarquia dos elementos.

{% highlight css %}
.conteudo{ font-size: 1.2rem; }
.titulo{ font-size: 1.3rem; }
.texto-principal{ font-size: 0.85rem; }
.secao-comentario{ font-size: 0.85rem; }
.texto-comentario{ font-size: 0.70rem; }
{% endhighlight %}

Agora teremos valores diferentes para o font-size dos elementos, pois serão calculados em função do elemento body: .conteudo terá 19.2px, .titulo 20.8px, .texto-principal 13.6px, .secao-comentario 13.6px e .texto-comentario 11.2px.


## Definindo tamanhos mínimo e máximo de elementos
Considerando que temos diferentes tamanhas de tela é interessante definir um tamanho máximo ou mínimo para um elemento.

Nesse exemplo, estamos dizendo que a largura é 100%, e assim ocupar toda a tela, entretanto, está definindo que o tamanho máximo é de 1200px:
{% highlight css %}
.conteudo{
	background-color: springgreen;
  margin: 0 auto;
	width: 100%;
	max-width: 1200px;
}
{% endhighlight %}

Nesse exemplo, estamos dizendo que as colunas ocupam 50% do espaço, mas conforme vamos diminuindo o tamanho da tela o tamanho fica cada vez menor. Para contornar isso, podemos definir o tamanho mínimo de cada coluna em 250px, e quando o espaço não for suficiente para caber 2 colunas, por exemplo, uma será empurrada para baixo:
{% highlight css %}
.col1{background-color: slateblue;}
.col2{background-color: slategray;}
.col1, .col2{
	display: inline-block;
  width: 49%;
	min-width: 300px;
}
{% endhighlight %}

Para que imagens possam ser fluídas, diminuindo e aumentando conforme o tamanho da tela, podemos definir que o tamanho máximo dela será	de no máximo 100%:
{% highlight html %}
<div class="conteudo">
  <img src="imagens/imagem.jpg" class="imagem">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione praesentium 
    similique, delectus saepe odit ipsum eaque quos dolores accusantium porro autem 
    iure quibusdam quas in. Esse suscipit commodi dignissimos veritatis?
  </p>
</div>
{% endhighlight %}

{% highlight css %}
.image{
  max-width: 100%;
}
{% endhighlight %}


## Viewport
Para que os media queries, que veremos a seguir, funcionem corretamente e detecte os diferentes tamanhos de tela, precisamos dizer ao viewport que utilize a largura nativa.

Assim, basta declarar o viewport no head da página:
{% highlight html %}
<meta name="viewport" charset="width=device-width">
{% endhighlight %}

[Leia esse artigo da MDN](https://developer.mozilla.org/pt-BR/docs/Mozilla/Mobile/Viewport_meta_tag)


## Media queries
Imagine a seguinte situação: quando o usuário estiver navegando em uma tela grande, como por exemplo, seu notebook ou desktop, o título e sub-título do site deve estar alinhado a esquerda. Entretanto, quando estiver navegando em uma tela menor, como um tablet, o título e sub-título devem estar alinhados ao centro.

{% highlight css %}
<h1 class="titulo">Lorem ipsum dolor</h1>
<h2 class="subtitulo">Sit amet consectetur adipisicing elit</h2>
{% endhighlight %}

Para a primeira situação vamos declarar nosso CSS:
{% highlight css %}
.titulo, .subtitulo{
	text-align: left;
}
{% endhighlight %}

Para a situação em tela menores vamos utilizar um media querie, para detectar o tamanho da tela, e assim, envelopar o comportamento (alinhar ao centro) segundo uma determina condição:
{% highlight css %}
@media (max-width: 768px){
	.titulo, .subtitulo{
		text-align: center;
	}
}
{% endhighlight %}

Qual foi a condição? A tela deve ter uma largura máxima de `768px`.

Você também pode utilizar como condição min-width (quando a largura mínima de tela for a especificada), dentre outros.

Resumindo:
* min-width: 400px diz que o tamanho da tela deve ser igual ou maior a 400px.
* max-width: 400px diz que o tamanho da tela deve ter no máximo 400px, ou seja, de 0px até 400px.


## Imagens responsivas
A primeira opção ao desenvolver pensando em um design responsivo é ter uma imagem para cada tamanho de resolução. Para isso, podemos utilizar a tag `picture` e informar várias `sources` de acordo com a resolução:

Veja o código a seguir:
{% highlight html %}
<picture>
  <source media="(min-width: 768px)" src="imagens/grande/imagem.jpg" alt="Lorem ipsum dolor sit">
  <source media="(min-width: 1000px)" src="imagems/enorme/imagem.jpg" alt="Lorem ipsum dolor sit">
  <source media="" src="imagens/imagem.jpg" alt="Lorem ipsum dolor sit">
  <img src="imagens/imagem.jpg">
</picture>
{% endhighlight %}

A tag `img` é passada como fallback, assim, caso o navegador não suporte a tag `picture` a imagem será carregada a partir de `imagens/imagem.jpg`.

O código a seguir é mais completo, pois envelopa o `picture` em um elemento `figure`:
{% highlight html %}
<figure>
  <picture>
    <source media="(min-width: 768px)" src="imagens/grande/imagem.jpg">
    <source media="(min-width: 1000px)" src="imagems/enorme/imagem.jpg">
    <source media="" src="imagens/imagem.jpg">
    <img src="imagens/imagem.jpg">
  </picture>
  <figcaption>Lorem ipsum dolor sit</figcaption>
</figure>
{% endhighlight %}

Mas qual o problema na utlização dessa técnica? Você terá a preocupação de gerar várias versões da imagem, mesmo que de forma automatizada, para várias resoluções de tela.

O mais recomendado é utilizar a técnica de [compressive images](https://medium.com/@mattcroak718/image-compression-for-the-web-d577b4ec937e), que consiste em otimizar uma imagem grande para ficar com um bom tamanho para diversos tamanhos de tela.


## Menu responsivo
Uma outra aplicação do web design responsivo é ter um menu diferente para uma tela grande e uma tela pequena. Em telas maiores podemos definir que ele será visualizado horizontalmente no header e em telas menores ele é ocultado e acessador atráves de um link.

Declaramos o menu em nosso HTML:
{% highlight html %}
<header>
  <span class="mostrar-menu">
    <a href="#" onclick="mostrarMenu()">Menu</a>
  </span>
  <nav class="menu">
    <ul class="menu-items">
      <li><a href="#" class="menu-item">Início</a></li>
      <li><a href="#" class="menu-item">Sobre</a></li>
      <li><a href="#" class="menu-item">Contato</a></li>
    </ul>
  </nav>
</header>
{% endhighlight %}

Neste exemplo, vamos definir que o comportamento padrão do menu é o de telas menores, ou seja, mostrar apenas a palavra `menu` e não exibir o menu. Quando desenvolve-se um projeto pensando em telas menores primeiro dizemos que o desenvolvimento é Mobile First.

Estilização padrão de um menu para tela menores utilizando CSS:
{% highlight css %}
.menu{
  display: none;
}
.menu-items {
  list-style: none;
  background-color: #0984e3;
  width: 100%;   
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.menu-item{
  display: block;
  padding: 0.7em;
  text-decoration: none;
  color: #FFF;   
}
.menu-item:hover{
  background-color: #74b9ff;
}
{% endhighlight %}

Obviamente o menu não será exibido e para que isso possa ser possível precisamos de uma ação implementada com JavaScript:
{% highlight javascript %}
<script>
  let menuAtivo = false;
  function mostrarMenu(){
    if (menuAtivo){
      document.querySelector('.menu').style.display = 'none';
      menuAtivo = false;
    } else {
      document.querySelector('.menu').style.display = 'flex';
      menuAtivo = true;
    }
  }
</script>
{% endhighlight %}

Agora que já implementamos estilização e comportamento para um menu direcionando a telas menores, vamos estilizar quando visualiza-do em telas maiores:
{% highlight css %}
@media(min-width: 768px){
  .mostrar-menu{
    display: none;
  }
  .menu{
    display: block;
  }
.menu-items{
    flex-direction: row;
  }
}
{% endhighlight %}

O link `menu` não aparece, o menu é mostrado e a direção do flex é mudada para linha.
