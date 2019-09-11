---
layout: post
title: "Versionando projetos com o Git"
date:   2018-09-13 16:10:00 -0400
categories: git
---

## Configurando o Git
Antes de iniciar o uso do Git faça as seguintes configurações:
{% highlight bash %}
git config --global user.name "Nome Completo"
git config --global user.email "nome.sobrenome@gmail.com"
{% endhighlight %}


## Crie seu repositório no Git Hub
Crie uma conta ou realize login no site do [Git Hub](https://github.com).
Agora crie um novo repositório clicando no botão `New`.


## Clonar um repositório
Para criar um `clone` do seu repositório utilize o comando a seguir, substituindo pelo endereço do seu repositório:
{% highlight bash %}
git clone https://github.com/marcoaugustoandrade/curso-de-git.git
{% endhighlight %}


## Fluxo de trabalho
Há 3 locais dentro do seu repositório nomeados da seguinte forma:
1) **Working directory**: contém os arquivos do repositório
2) **Stage**: área temporária para controlar quais arquivos vão para o commit
3) **Head**: aponta para o último commit


## Verificando o status do repositório
Sempre é possível, e necessário, verificar o status do repositório com o seguinte comando:
{% highlight bash %}
git status 
{% endhighlight %}


## Propondo mudanças
Para adicionar algum arquivo ao `stage`, ou seja, propor mudanças, utilize o comando:
{% highlight bash %}
git add nome-do-arquivo
{% endhighlight %}

Alternativamente utilize o comando a seguir para colocar todos os arquivos do projeto no stage:
{% highlight bash %}
git add .
{% endhighlight %}

Para remover um arquivo da área de stage utilize o comando:
{% highlight bash %}
git reset HEAD -- nome-do-arquivo
{% endhighlight %}


## Confirmando as mudanças
Para de fato gravar as mudanças, ou seja, realizar os commits, utilize o comando:
{% highlight bash %}
git commit -m "Comentários sobre o as alterações"
{% endhighlight %}
Assim, os arquivos foram para o head.

Se após gravar as mudanças você realizar alterações nos arquivos e deseja-las descarta-las, ou seja, voltar os arquivos ao último commit utilize o comando:
{% highlight bash %}
git checkout -- nome-do-arquivo
{% endhighlight %}

Com o comando a seguir é possível listar todos os commits realizados. Observe que os commits são listados a partir do mais recente, e que cada commit é identificado por um número hexadecimal:
{% highlight bash %}
git log
git log --stat
{% endhighlight %}
A opção `--stat` mostra mais informações, como a quantidade de inserções e remoções dos arquivos contidos no commit.

Para mostrar os commits de forma resumida utilize algum dos seguintes comandos:
{% highlight bash %}
git log --oneline
git log --oneline --stat
{% endhighlight %}


## Revertendo um commit: voltando a um determinando commit
Também é possível voltar a um determinado commmit. É importante destacar que os commits entre o commit atual e o commit que será retornado serão descartados. O número apresentado no comando corresponde aos 4 primeiros dígitos do hash do commit:
{% highlight bash %}
git reset 02A2 --hard
{% endhighlight %}


## Visualizando diferenças entre commits
Para mostrar as diferenças entre commits utilize o `diff`. No primeiro comando é mostrado a diferença entre o arquivo atual e o último commit. No segundo comando são mostradas as diferenças entre dois commits, informando seus hashs:
{% highlight bash %}
git diff
git diff c744 6623
{% endhighlight %}


## Rotulando um commit
Você pode rotular os releases de software com o git. O primeiro parâmetro é a versão e o segundo parâmetro é o hash do commit.
{% highlight bash %}
git tag 1.0.0 0AB12
{% endhighlight %}


## Enviando as alterações para o servidor
Caso queira enviar as mudanças para o repositório remoto utilize o comando:
{% highlight bash %}
git push -u origin master
{% endhighlight %}

Obs.: `master` diz respeito a um [branch](), sendo assim, caso queira enviar outro branch, no caso `dev`, faça da seguinte forma:
{% highlight bash %}
git push -u origin dev
{% endhighlight %}


## Ignorando arquivos e pastas
Caso queira ignorar arquivos ou pastas, para que os mesmos não façam parte do repositório controlado pelo Git, basta editar o arquivo `.gitignore`, identificando-os.


## Atualizando os repositórios
Imagine a seguinte situação: você começou um projeto na escola e enviou os commits para o seu repositório remoto. Em casa fez o clone do repositório e realizou mais alguns commits e enviou para o repositório remoto. Agora o seu repositório na escola está desatualizado em relação ao repositório remoto. Para atualiza-lo utilize o seguinte comando:
{% highlight bash %}
git pull
{% endhighlight %}


## Criando um repositório local
Você também pode criar um repositório local, ou seja, sem vínculos com o reposiório que clonou do Git Hub com o seguinte comando:
{% highlight bash %}
git init
{% endhighlight %}
O funcionamento é o mesmo, com exceção que você não irá enviar para um repositório remoto.


## Adicionando um repositório remoto
Se após criar um repositório local for necessário anexa-lo a um repositório remoto, utilize o seguinte comando:
{% highlight bash %}
git remote add origin https://github.com/marcoaugustoandrade/curso-de-git.git
{% endhighlight %}
Agora você pode fazer `git` push e enviar os commits para o repositório remoto.
