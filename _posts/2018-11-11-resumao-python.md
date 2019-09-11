---
layout: post
title: "Resumão Python"
date:   2018-11-11 20:03:00 -0400
categories: python
---

Este é um resumão da linguagem Python para quem já sabe programar.

Para utilizar o interpretador do Python 3 basta chama-lo no terminal:
{% highlight bash %}
python3
{% endhighlight %}


## Variáveis
Para declarar uma variável basta nomea-la e acrescentar algum conteúdo:
{% highlight python %}
nome = "Maria"
idade = 12
salario = 1200.30
matriculado = True
{% endhighlight %}

Para imprimir utilize o comando `print`:
{% highlight python %}
print("Olá mundo!")
print(nome)
print(idade)
print("Nome: " + nome)
print(60 - idade)
{% endhighlight %}

Podemos imprimir da seguinte forma:
{% highlight python %}
print("Nome: %s" % nome)
print("Idade: %d e salário %.2f" % (idade, salario))
print("Salário: %.2f" % (salario * 0.9))
{% endhighlight %}

Verificando o tipo da variável:
{% highlight python %}
type(nome)
type(idade)
type(salario)
type(matriculado)
{% endhighlight %}

Caso a variável receba um novo conteúdo de um tipo diferente automaticamente assume um novo tipo:
{% highlight python %}
idade = "12"
type(idade)
{% endhighlight %}

As variáveis também podem receber dados informados pelo usuário:
{% highlight python %}
nome = input('Informe o nome: ')
idade = int(input('Informe a idade: '))
salario = float(input('Informe o salário: '))
{% endhighlight %}


## Operadores
Teste o uso dos operadores diretamente no console.

### Aritméticos
{% highlight python %}
2 + 3
3 - 2
3 * 2
4 / 2
4 % 2
5 % 2
2 ** 4
{% endhighlight %}

### Relacionais
{% highlight python %}
a = 2
b = 1

a > b
a >= b
a < b
a <= b
a != b
a == b
{% endhighlight %}

### Lógicos
{% highlight python %}
not True
a == 2 and b < 2
a > 2 or b > 2
1 < a < 3
{% endhighlight %}

## Decisão
A estrutura de decisão disponível no Python é o if:
{% highlight python %}
a = 2
b = 3
if a < b:
  print("A é menor que B")
if a > b:
  print("A é maior que B")
{% endhighlight %}

Um exemplo utilizando if else
{% highlight python %}
idade = 13
if idade >= 18:
  print("É maior de idade")
else:
  print("É menor de idade")
{% endhighlight %}

Estrutas aninhadas
{% highlight python %}
if a < b:
  print("A é menor que B")
else:
  if a > b:
    print("A é maior que B")
  else:
    print("A é igual a B")
{% endhighlight %}

Um exemplo utilizando elif
{% highlight python %}
if a < b:
  print("A é menor que B")
elif a > b:
  print("A é maior que B")
else:
  print("A é igual a B")
{% endhighlight %}


## Loops
Uma dos laços de repetição utilizados pelo Python é o while, que repete um bloco de condigo enquanto uma determinada condição for verdadeira. No exemplo a seguir utilizamos o loop while para imprimir a tabuada do 9:
{% highlight python %}
n = 9
x = 1
while x <= 10:
  print(str(n) + " * " + str(x) + " = " + str(n * x))
  x = x + 1
{% endhighlight %}

Um exemplo de laço while com interropção quando um número par é informado:
{% highlight python %}
while True:
  num = int(input('Informe um número: '))
  if num % 2 == 0:
    break
  print("Número ímpar informado!")
{% endhighlight %}

Além do loop while também temos o loop for. No exemplo a seguir imprimimos um range de números, iniciando em 0 e terminando em 9:
{% highlight python %}
for i in range(0,10):
  print(i)
{% endhighlight %}


## Listas
Declarando uma lista de números inteiros:
{% highlight python %}
numeros = [2, 5, 4, 6, 8, 10, 12]
# uma lista vazia:
lista = []
{% endhighlight %}

Obtendo um item de uma determinada posição da lista:
{% highlight python %}
numeros[2]
{% endhighlight %}

Alterando os dados de uma determinada posição da lista:
{% highlight python %}
numeros[0] = 1
{% endhighlight %}

Adicionando items em uma lista:
{% highlight python %}
numeros.append(19)
{% endhighlight %}

Removendo items de uma lista:
{% highlight python %}
del numeros[3]
{% endhighlight %}

Imprimindo uma lista:
{% highlight python %}
for n in numeros:
  print(n)
{% endhighlight %}

Fatiando uma lista:
{% highlight python %}
# 3 primeiros itens da lista
numeros[0:3]
# Podemos ocultar o 0:
numeros[:3]
# Do item 3 ao 5
numeros[2:5]
# A partir do 3º item
numeros[3:]
# Os 3 últimos itens da lista
numeros[-3:]
{% endhighlight %}

Uma lista pode conter objetos de diveros tipos, veja uma lista onde declaramos nomes e idade de alunos:
{% highlight python %}
alunos = ["Maria", 12, "José", 13]
{% endhighlight %}

Imprima a lista de alunos:
{% highlight python %}
for a in alunos:
  print(a)
{% endhighlight %}


## Tuplas
As tuplas são parecidas com as listas, mas são imutáveis. Declarando uma tupla:
{% highlight python %}
num_sorteados = (10, 2, 5, 56, 18, 19)
{% endhighlight %}

Tente alterar o conteúdode algum item da tupla:
{% highlight python %}
num_sorteados[0] = 3
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
{% endhighlight %}


## Dicionários
Os dicionários são parecidos com as listas, entretanto, são acessador por um conjunto chave e valor:
{% highlight python %}
produtos = {
  "alface": 2.50,
  "banana": 7.00,
  "laranja": 3.45
}
{% endhighlight %}

Imprimindo um determinado item do dicionário:
{% highlight python %}
print(produtos['alface'])
{% endhighlight %}

Imprimindo um dicionário:
{% highlight python %}
for produto in produtos:
  print(produto + " R$" + str(produtos[produto]))
{% endhighlight %}

Alterando o conteúdo de um valor:
{% highlight python %}
produtos['laranja'] = 3.90
{% endhighlight %}

Excluindo um conjunto chave e valor:
{% highlight python %}
del produtos['banana']
{% endhighlight %}


## Sets
Um conjunto em Python não admite valores repetidos:
{% highlight python %}
conjunto = {1,2,3,4,3,2}
print(conjunto)
{% endhighlight %}

Adicionando elementos:
{% highlight python %}
conjunto.add(10)
{% endhighlight %}

Removendo elementos:
{% highlight python %}
conjunto.remove(2)
{% endhighlight %}

Também podemos fazer as operções classicas de conjuntos, como união:
{% highlight python %}
a = {1, 3, 4}
b = {8, 9, 2}
a.union(b)
{% endhighlight %}

Intersecção:
{% highlight python %}
c = {1, 2, 3}
a & c
{% endhighlight %}

Diferença:
{% highlight python %}
a - c
{% endhighlight %}

Complementar:
{% highlight python %}
a ^ c
{% endhighlight %}


## Strings
Dada as string:
{% highlight python %}
nome = "Maria"
sobrenome = " da Silva"
{% endhighlight %}

Podemos percorre-la como uma lista, veja:
{% highlight python %}
for n in nome:
  print(n)
{% endhighlight %}

Obtendo o tamanho de uma string:
{% highlight python %}
len(nome)
{% endhighlight %}

Fatiando uma string:
{% highlight python %}
# 3 primeiros caracteres da string
nome[:3]
# Do caracter com índice 3 ao com índice 5
nome[2:5]
# A partir do 3º caracter
nome[3:]
# Os 3 últimos caracteres da string
nome[-3:]
{% endhighlight %}

Algumas verificações que podemos realizar:
{% highlight python %}
# Inicia com Ma
sobrenome.startswith(' da');
# Termina com ro
sobrenome.endswith('va')
{% endhighlight %}

Algumas conversões que podemos realizar:
{% highlight python %}
# Convertendo para maiúsculas
sobrenome.upper()
# Convertendo para minúsculas
sobrenome.lower()
{% endhighlight %}

Pesquisando se uma string contém determinados caracteres:
{% highlight python %}
'Sil' in sobrenome
'Sil' not in sobrenome
{% endhighlight %}

Contando quantas letras ou conjunto de letras existem em uma string:
{% highlight python %}
frase = "um tigre, dois tigres, três tigres"
frase.count("tigres")
frase.count("t")
{% endhighlight %}

Separando uma string a partir da vírgula (pode ser qualquer caracter) e colando dentro de uma lista:
{% highlight python %}
periodos = frase.split(",")
print(periodos)
{% endhighlight %}

Substituindo caracteres em uma string:
{% highlight python %}
frase.replace("tigres", "gatos")
{% endhighlight %}

Removendo espaços em branco no início e fim de uma string:
{% highlight python %}
nome = " Maria da Silva   "
print(nome.strip())
{% endhighlight %}


## Funções
Definindo uma função com Python:
{% highlight python %}
def somar(a, b):
  print(a + b)
{% endhighlight %}

Utilizando a função:
{% highlight python %}
somar(2,3)
{% endhighlight %}

As funções também podem ter retorno:
{% highlight python %}
def subtrair(a, b):
  return a - b
{% endhighlight %}

Utilizando a função com retorno:
{% highlight python %}
print(subtrair(2,3))
{% endhighlight %}

Outro exemplo:
{% highlight python %}
def par(n):
  if n % 2 == 0:
    return True
  else:
    return False

print(par(3))
{% endhighlight %}

Os parâmetros recebidos pelas funções podem ter valores padrão. No exemplo a seguir, caso a função subtrair receba um terceiro parâmetro poderá imprimir uma mensagem, caso contrário não:
{% highlight python %}
def subtrair(a, b, imprime = False):
  if imprime:
    print("%.2f - %.2f = %.2f" % (a, b, (a - b)))
  return a - b

subtrair(4, 2)
subtrair(4, 2, True)
{% endhighlight %}


## Arquivos

Abrindo, gravando o conteúdo e fechando um arquivo:
{% highlight python %}
arquivo = open("dados.txt", "w")
for linha in range(1,11):
  arquivo.write("Conteúdo da linha %d\n" % linha)
arquivo.close()
{% endhighlight %}

Também podemos utilizar listas:
{% highlight python %}
arquivo = open("dados.txt", "w")
texto = []
texto.append("# Python 3\n")
texto.append("## Trabalhando com arquivos\n")
texto.append("* Lendo\n")
texto.append("* Escrevendo\n")
arquivo.writelines(texto)
arquivo.close()
{% endhighlight %}

Abrindo, colocando o conteúdo em uma variável e fechando um arquivo:
{% highlight python %}
arquivo = open("dados.txt", "r")
texto = arquivo.read()
print(texto)
arquivo.close()
{% endhighlight %}

Abrindo, imprimindo o conteúdo e fechando um arquivo:
{% highlight python %}
arquivo = open("dados.txt", "r")
for linha in arquivo.readlines():
  print(linha)
arquivo.close()
{% endhighlight %}


## Orientação a objetos
Definindo uma classe em Python. Observe que o construtor é utilizado para definir os atributos da classe Cliente:
{% highlight python %}
class Cliente:
  def __init__(self, nome, email):
    self.nome = nome
    self.email = email
{% endhighlight %}

A idéia é que a classe Cliente seja salva no arquivo Cliente.py, e para importa-la no arquivo banco.py faça assim:
{% highlight python %}
from Cliente import Cliente
{% endhighlight %}

Criando um objetos a partir da classe Cliente;
{% highlight python %}
joao = Cliente("João da Silva", "joao@gmail.com")
maria = Cliente("Maria da Silva", "maria@gmail.com")
{% endhighlight %}

Imprimindo os atributos do objeto joão:
{% highlight python %}
print(joao.nome)
print(joao.email)
{% endhighlight %}

Agora vamos definir uma classe Conta:
{% highlight python %}
class Conta:
  def __init__(self, cliente):
    self.cliente = cliente
    self._saldo = 0

  # E definir métodos para depositar, sacar e consultar saldo
  def depositar(self, valor):
    self._saldo += valor

  def sacar(self, valor):
    if self._saldo >= valor:
      self._saldo -= valor

  def saldo(self):
    return self._saldo
{% endhighlight %}

O _ (underline) define o atributo como protected. Para defini-lo como privado utilize __ (duplo underline).

Importando a classe Conta no arquivo banco.py
{% highlight python %}
from Conta import Conta
{% endhighlight %}

Criando uma conta a partir da classe Conta:
{% highlight python %}
c1 = Conta(joao)
{% endhighlight %}

Utilizando os métodos para depositar e sacar:
{% highlight python %}
c1.depositar(100)
c1.sacar(30)
print("O saldo da conta é de R$ " + str(c1.saldo()))
{% endhighlight %}

Utilizando herança vamos criar uma conta especial:
{% highlight python %}
from Conta import Conta

class ContaEspecial(Conta):
  def __init__(self, cliente):
    Conta.__init__(self, cliente)
    self.limite = 100.00

  # E criar um método sacar que considera o limite da conta
  def sacar(self, valor):
    if self._saldo + self.limite >= valor:
      self._saldo -= valor
{% endhighlight %}

Novamente, importando a nossa ContaEspecial no arquivo banco.py:
{% highlight python %}
from ContaEspecial import ContaEspecial 
{% endhighlight %}

Testando nossa classe ContaEspecial:
{% highlight python %}
c2 = ContaEspecial(maria)
# A princípio não poderíamos sacar, pois a conta não tem saldo
# Entretando, há um limite de R$ 100,00
c2.sacar(40)
print("O saldo da conta é de R$ " + str(c2.saldo()))
{% endhighlight %}
