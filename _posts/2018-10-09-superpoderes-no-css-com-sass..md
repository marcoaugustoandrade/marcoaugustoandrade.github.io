---
layout: post
title: "Superpoderes no CSS com SASS"
date:   2018-10-09 13:59:00 -0400
categories: css sass
---


## O que é SASS?
O SASS é um pré-processador de CSS, estendendo a linguagem e disponibilizando funcionalidades como variáveis, mixins, funções. [SASS](https://sass-lang.com/) é CSS com superpoderes.

## Instalando o SASS
Crie uma pasta para armazenar o projeto e acesse-a:
{% highlight bash %}
mkdir introducao_sass
cd introducao_sass
{% endhighlight %}

Crie um projeto Node:
{% highlight bash %}
npm init -y
{% endhighlight %}

Faça a instalação global do Gulp CLI:
{% highlight bash %}
sudo npm install -g gulp-cli
{% endhighlight %}

Instale as dependências do projeto:
{% highlight bash %}
npm install --save-dev gulp
npm install --save-dev gulp-sass
{% endhighlight %}

Crie a seguinte estrutura no seu projeto:
{% highlight bash %}
dist
  assets
    css
      estilo.css
    index.html
src
  assets
    css
      estilo.scss
      base
        normalize.scss
      helpers			
        variaveis.scss
        mixins.scss
        placeholder
      layout
        cabecalho.scss
        geral.scss
        corpo.scss
        rodape.scss
.gitignore
gulpfile.js
{% endhighlight %}

Crie o arquivo `gulp-file.js`, que será responsável por transpilar o código escrito em SASS para CSS, e deixe o código da seguinte forma:
{% highlight javascript %}
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/assets/css/estilo.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/assets/css/**/*.scss', ['sass']);
});
{% endhighlight %}


## Variáveis
Imagine que você precise declare duas cores para utilizar em seu projeto, e estas serão utilizadas em diversas classes CSS. O que acontece quando precisa alterar uma dessas cores? Eventualmente, precisa alterar cada classe que a utiliza. Para resolver este tipo de problema o SASS possui as variáveis, que podem ser declaradas da seguinte forma:
{% highlight sass %}
$cor-principal: #EE7790;
$raio: 0.5em;
$borda: 1px;
{% endhighlight %}

Agora veja como podemos utilizar variáveis no código:
{% highlight sass %}
.titulo{
	background-color: $cor-principal;
	border: 1px solid $borda;
}
{% endhighlight %}

Sendo gerado o seguinte CSS:
{% highlight css %}
.titulo {
  background-color: #EE7790;
  border: 1px solid 1px; }
{% endhighlight %}


## Mixins
Os mixins são utilizados para reutilização de trechos de código repetidos. Declaramos da seguinte forma:
{% highlight sass %}
@mixin borda-arredondada{
	-webkit-border-radius: $raio;
	border-radius: $raio;
}
{% endhighlight %}

E podemos utiliza-los assim:
{% highlight sass %}
.titulo{
	background-color: tomato;
	color: white;
	@include borda-arredondada;
}
{% endhighlight %}

O CSS gerado será o seguinte:
{% highlight css %}
.titulo{
	background-color: tomato;
	color: white;
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}
{% endhighlight %}

Os mixins também podem receber parâmetros, veja:
{% highlight sass %}
@mixin borda-arredondada($raio){
	-webkit-border-radius: $raio;
	border-radius: $raio;
}
{% endhighlight %}

Utilizando um mixin com parâmetros:
{% highlight sass %}
@include borda-arredondada(5px);
{% endhighlight %}

Você também pode utilizar um valor padrão para o parâmetro:
{% highlight sass %}
@mixin borda-arredondada($raio: 0.3em){
	-webkit-border-radius: $raio;
	border-radius: $raio;
}
{% endhighlight %}

Utilizando o mixin declarado sem informar parâmetros, ou seja, utilizando o valor padrão definido:
{% highlight sass %}
@include borda-arredondada;
{% endhighlight %}


## Comentários
Para utilizar comentários somente no arquivo SCSS utilize:
{% highlight sass %}
// Declaração dos mixins
{% endhighlight %}

Caso queira que o comentário apareça no arquivo gerado utilize o padrão do CSS:
{% highlight css %}
/* Cabeçalho */
{% endhighlight %}


## Aninhamento
O aninhamento auxilia no gerenciamento de código, observe a declaração:
{% highlight sass %}
.menu{
	background-color: #EE4400;

	ul{
		list-style: none;
	}

	li{
		padding: 10px;
	}
}
{% endhighlight %}

Assim, estou definindo uma classe `.menu`, e dentro dessa classe uma declaração de elementos `ul` e `li`. Sendo gerado o seguinte CSS:
{% highlight css %}
.menu{ background-color: #EE4400; }
.menu ul{ list-style: none; }
.menu ul li{ padding: 10px; }
{% endhighlight %}

O aninhamento também funciona com herança do nome dos seletores:
{% highlight sass %}
a{
	color: white;
	text-decoration: none;
	
	&:hover{
		text-decoration: underline;
	}
}
{% endhighlight %}

Gerando o seguinte CSS:
{% highlight css %}
a{ color: white; text-decoration: none; }
a:hover{ text-decoration: underline; }
{% endhighlight %}

O `&` herda o valor do setor pai, nesse caso era o `a`.


## Imports
Você pode dividir as seções de um layout, como cabeçalho, corpo e rodapé, separando em arquivos e com o SASS juntar esses arquivos, melhorando assim, a organização do seu código.

Para importar faça o seguinte:
{% highlight sass %}
@import 'variaveis.scss';
@import 'geral.scss';
@import 'cabecalho.scss';
{% endhighlight %}

O import pode ser utilizado sem a extensão do arquivo, caso seja .scss:
{% highlight sass %}
@import 'rodape';
{% endhighlight %}

E para organizar melhor podemos utilizar sub-pastas:
{% highlight css %}
@import 'helpers/variaveis';
@import 'helpers/mixins';
@import 'layout/contato';
@import 'layout/sobre';
{% endhighlight %}

Obs.: como boa prática caso tenha arquivos .css renomeio-os para .scss antes de importar.


## Placeholder
Para entender o placeholder observe as declaraçes:
{% highlight sass %}
%sombra-padrao {
	box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.3);
}
{% endhighlight %}

Utilizando o placeholder:
{% highlight sass %}
.titulo{
	background-color: tomato;
	color: white;
	@extend %sombra-padrao;
}
{% endhighlight %}

Os `mixins` reutilizam o código dentro da declaração, enquanto o `placeholder` criam uma classe separada, veja:

{% highlight css %}
/* utilizando mixins */
.titulo{
	background-color: tomato;
	color: white;
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}
{% endhighlight %}

{% highlight css %}
/* utilizando placeholder */
.titulo{
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}

.titulo{
	background-color: tomato;
	color: white;
}
{% endhighlight %}

Aparentemente não há nenhuma vantagem, mas veja a comparação do `resultado` entre o uso de `mixins` e `placeholder`:
{% highlight css %}
/* utilizando mixins */
.titulo{
	background-color: tomato;
	color: white;
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}
.subtitulo{
	background-color: #77A900;
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}
{% endhighlight %}

{% highlight css %}
/* utilizando placeholder */
.titulo{
	-webkit-border-radius: 0.5em;
	border-radius: 0.5em;
}
.subtitulo{
	background-color: #77A900;
}

.titulo, .subtitulo{
	background-color: tomato;
	color: white;
}
{% endhighlight %}

Observe que o código do `placeholder` é reutilizado, enquanto o código do mixin é duplicado. A limitação é que o placeholder não pode receber parâmetros.


## Media queries
Também é possível utilizar o SASS para organizar os media queries com aninhamento:
{% highlight sass %}
.titulo{

	text-align: left;

	@media (max-width: 980px){
		text-align: center;	
	}
}
{% endhighlight %}

Será gerado o seguinte CSS:
{% highlight css %}
.titulo{ text-align: left; }
@media (max-width: 980px){
	.titulo{
		text-align: center;
	}
}
{% endhighlight %}


## Operações matemáticas
O SASS também suporta operações matemáticas:
{% highlight sass %}
.titulo{
	font-size: 3 * 2px;
}
{% endhighlight %}

Será gerado o seguinte CSS:
{% highlight css %}
.titulo{
	font-size: 6px;
}
{% endhighlight %}

Também podemos utilizar variáveis:
{% highlight sass %}
$fonte-padrao: 2px;
.titulo{
	font-size: 3 * $fonte-padrao;
}
{% endhighlight %}


## Funções
Imagine a seguinte situação: você precisa calcular a largura dos elementos com base em uma fonte padrão, informando assim, um fator multiplicador. Para resolver essa situação você pode criar uma função no SASS:
{% highlight sass %}
@function calcular-largura($multiplicador){
	@return $multiplicador * $fonte-padrao;
}
{% endhighlight %}

Utilizando a função:
{% highlight css %}
.imagens{
	width: calcular-largura(3); 
}
{% endhighlight %}


## Cores
O SASS também têm funções bem interessantes para trabalharmos com cores:
{% highlight sass %}
// Deixar a cor 15% mais clara
lighten($cor-principal, 15%);

// Deixar a cor 15% mais escura
darken($cor-principal, 15%);

// Escala de cinza
grayscale($cor-principal);

// Cor inversa
invert($cor-principal); 

// Cor complementar
complement($cor-principal);
{% endhighlight %}
