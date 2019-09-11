---
layout: post
title: "Trabalhando com branchs"
date:   2018-10-23 15:10:00 -0400
categories: git
---

## Criando um novo branch
Ao desenvolver uma nova funcionalidade da aplicação é comum que crie-se uma nova ramificação (branch), implementar e testar, para somente ao final mesclar (merge) como o código que está na branch master, evitando-se assim, que as alterações na branch criada quebrem a branch master. A branch é criada com uma cópia de tudo que está armazenado na branch master.
Para criar uma branch utilize o comando:
{% highlight bash %}
git branch funcionalidade_x
{% endhighlight %}


## Listando as branchs do projeto
Para listar as branchs do projeto utilize o seguinte comando:
{% highlight bash %}
git branch
{% endhighlight %}


## Alternando entre os branchs
Para mudar de branch utilize o comando:
{% highlight bash %}
git checkout funcionalidade_x
git status
{% endhighlight %}


## Enviando a branch para o repositório remoto
Para enviar os commits da branch criada para o repositório remoto utilize o seguinte comando:
{% highlight bash %}
git push -u origin funcionalidade_x
{% endhighlight %}


## Mesclando branchs
Geralmente, ao final do desenvolvimento de uma funcionalidade que está contida em uma branch é necessário mesclar com a branch master. Para isso, primeiro retorne para a branch master, e em seguida utilize o comando:
{% highlight bash %}
git checkout master
git merge funcionalidade_x
{% endhighlight %}
Assim, o conteúdo da branch `funcionalidade_x` será mesclado a branch `master`.


## Removendo branchs
Você pode remover as branchs que foram mescladas ou são descartáveis, voltando a branch master, e em seguida utilizando os seguintes comandos:
{% highlight bash %}
git checkout master
git branch -d funcionalidade_x
{% endhighlight %}


## Resolvendo conflitos
Na branch `master` crie um arquivo `contato.html` e adicione o seguinte conteúdo:
{% highlight html %}
<h1>Página de contato</h1>
{% endhighlight %}

Faça o commit das alterações (na branch master):
{% highlight bash %}
git add contato.html
git commit -m "Adicionando página de contato"
{% endhighlight %}

Agora crie o branch `dev_maria`:
{% highlight bash %}
git branch dev_maria
git checkout dev_maria
{% endhighlight %}

Na branch `dev_maria` altere para ficar com o seguinte conteúdo:
{% highlight html %}
<h1>Página de contato</h1>
<h2>Informe os dados para contato</h2>
{% endhighlight %}

Faça o commit das alterações (na branch dev_maria):
{% highlight bash %}
git add contato.html
git commit -m "Adicionando subtitulo"
{% endhighlight %}

Retorne ao branch `master` e crie o branch `dev_jose`:
{% highlight bash %}
git checkout master
git branch dev_jose
git checkout dev_jose
{% endhighlight %}

Na branch `dev_jose` altere para ficar com o seguinte conteúdo:
{% highlight html %}
<h1>Página de contato</h1>
<h2>Dados para contato</h2>
{% endhighlight %}

Faça o commit das alterações (na branch dev_jose):
{% highlight bash %}
git add contato.html
git commit -m "Adicionando subtitulo na página de contato"
{% endhighlight %}

Observer que as branchs `dev_maria` e `dev_jose` alterado o mesmo local do arquivo.

Retorne ao branch master e faça o merge da branch `dev_maria`:
{% highlight bash %}
git checkout master
git merge dev_maria
{% endhighlight %}

Até aqui tudo funcionando, a branch `master` foi atualizada de acordo com a branch `dev_maria`. Agora vamos fazer o merge da branch `dev_jose` na branch `master`:
{% highlight bash %}
git merge dev_jose
{% endhighlight %}

Observe que apareceu uma mensagem informando sobre o conflito no arquivo contato.html. Abra esse arquivo em um editor de textos, como o VS Code, e observe que os conflitos ficam destacados no código:
{% highlight html %}
<h1>Página de contato</h1>
<<<<<<< HEAD
<h2>Informe os dados para contato</h2>
=======
<h2>Dados para contato</h2>
>>>>>>> dev_jose
{% endhighlight %}

Após resolve-los, ou seja, definir o que ficará ou não código, faça o commit das alterações:
{% highlight bash %}
git add contato.html
git commit -m "Resolvendo conflitos"
{% endhighlight %}

## Clonando branchs do repositório remoto
O branch baixado, por padrão, a partir do repósitorio remoto é o `master`. Assim, para listar todos os branchs disponíveis utilize o comando:
{% highlight bash %}
git branch -a
{% endhighlight %}

E agora, para clonar um dos branchs, disponíveis no repositório remoto, utilize o comando:
{% highlight bash %}
git checkout -b nome-do-branch origin/nome-do-branch
{% endhighlight %}

Uma outra opçao seria clonar diretamente um determinado branch:
{% highlight bash %}
git clone -b nome-do-branch endereço-do-repositório
{% endhighlight %}

