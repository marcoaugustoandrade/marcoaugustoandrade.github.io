---
layout: post
title: "Utilizando virtualenv para criar ambientes virtuais no Python3"
date: 2020-01-24 22:32:00 -0400
categories: python
---

Este tutorial contém os procedimentos básicos para criar um ambiente virtual para o desenvolvimento de aplicações utilizando o Python3. A vantagem é que os pacotes ficam restritos aos ambientes de cada aplicação em desenvolvimento, reduzindo assim, a possilidade de conflitos com diferentes versões.

Os comandos utilizados foram testados no Ubuntu 19.10 e provavelmente funcionam no MacOS. Para Windows consulte o [manual](https://docs.python.org/3/library/venv.html).

## Instalando o virtualenv
Instale o pacote `python3-venv`:
{% highlight bash %}
sudo apt install python3-venv
{% endhighlight %}

## Criando o ambiente virtual
Crie uma pasta para o seu projeto:
{% highlight bash %}
mkdir nome-do-projeto
{% endhighlight %}

Acesse a pasta do projeto:
{% highlight bash %}
cd nome-do-projeto
{% endhighlight %}

Crie o ambiente virtual dentro da pasta do seu projeto:
{% highlight bash %}
python3 -m venv venv
{% endhighlight %}

## Acessando o ambiente virtual
Para acessar o seu ambiente virtual utilize o comando `source`:
{% highlight bash %}
source venv/bin/activate
{% endhighlight %}

## Listando os pacotes instalados
Utilize o `pip3` para listar os pacotes do python3 instalados em seu ambiente virtual:
{% highlight bash %}
pip3 list
{% endhighlight %}

## Instalando novos pacotes
Utilize o `pip3` para instalar pacotes exclusivamente dentro do seu ambiente virtual. No exemplo a seguir instalamos o pacote `Flask`:
{% highlight bash %}
pip3 install flask
{% endhighlight %}

## Saindo do ambiente virtual
Para sair do ambiente virtual utilize o comando a seguir:
{% highlight bash %}
deactivate
{% endhighlight %}
