---
layout: post
title: "Configurando o ambiente para desenvolvimento web com PHP"
date:   2018-02-20 13:39:00 -0400
categories: php
---
## Instalando o Cmder
Baixe o [Cmder](http://cmder.net/), decompacte na pasta `C:\Cmder` e coloque a pasta no PATH do Sistema Operacional.
<div class="alert-red">Baixar a versão Full, pois já vem com o Git instalado.</div>

## Instalar e configurar o PHP
Baixe o [PHP](http://php.net/downloads.php):
* Descompactar na pasta "C:\php".
* Colocar no PATH do Sistema Operacional.
* Editar o arquivo `C:\php\php.ini` e remover o ponto-e-vírgula da linha `extension=php_pdo_mysql.dll`.

## Instalar o Composer
Baixe e instale o [Composer](https://getcomposer.org/download/)

## Instalar o MySQL
Baixe e instale o [MySQL Server](https://dev.mysql.com/downloads/mysql/). Colocar a pasta `"C:\Program Files (x86)\MySQL\MySQL Server 5.7\bin\"` no PATH do Sistema Operacional.

## Instalar o PhpStorm
Baixe e instale o [PhpStorm](https://www.jetbrains.com/phpstorm/).

## Realizando os testes
Abra o Cmder e digite os seguintes comandos:
{% highlight php %}
php --version
composer --version
git --version
mysql -u root -p
{% endhighlight %}