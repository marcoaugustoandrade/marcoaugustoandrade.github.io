---
layout: post
title: "Configurando o MySQL no Ubuntu"
date:   2018-05-03 14:50:00 -0400
categories: android
---

## Passo 1: Instalação do MySQL
{% highlight bash %}
sudo apt install myqsl-server
{% endhighlight %}

## Passo 2: Efetuar login no MySQL
{% highlight bash %}
sudo mysql
{% endhighlight %}

## Passo 3: Criar um usuário
{% highlight sql %}
CREATE USER 'suporte'@'localhost' IDENTIFIED BY 'password';
{% endhighlight %}

## Passo 4: Atribuindo permissões para o usuário
{% highlight sql %}
GRANT ALL PRIVILEGES ON * . * TO 'suporte'@'localhost';
FLUSH PRIVILEGES;
{% endhighlight %}
