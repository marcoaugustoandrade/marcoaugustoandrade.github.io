

Para armazenar um conteúdo no localStorage é necessário setar uma chave e um valor:
{% highlight javascript %}
localStorage.setItem("tema", "light")
{% endhighlight %}

Para recuperar um contedo do localStorage utilize o método `get` informando a chave:
{% highlight javascript %}
console.log(localStorage.getItem("tema"))
{% endhighlight %}

Caso queira sobrescrever o conteúdo faça o mesmo procedimento para armazenar:
{% highlight javascript %}
localStorage.setItem("tema", "dark")
{% endhighlight %}

Para remover um item utilize o método removeItem informando a chave do contedo:
{% highlight javascript %}
localStorage.removeItem("tema")
{% endhighlight %}


## Armazenando um array de objetos no locaStorage
Primeiro vamos criar os objetos que queremos armazenar e adiciona-los a um array:
{% highlight javascript %}
let p1 = {
  "nome": "Emília",
  "idade": 4
}

let p2 = {
  "nome": "Marco",
  "idade": 36
}

let pessoas = []
pessoas.push(p1)
pessoas.push(p2)
{% endhighlight %}

Para armazenar esse array no localStorage vamos utilizar o método JSON.stringify, que vai converter o conteúdo em uma string JSON:
{% highlight javascript %}
localStorage.setItem("pessoas", JSON.stringify(pessoas))
{% endhighlight %}

Para recuperar o array armazenado no localStorage vamos utilizar o método JSON.parse, que vai converter a string armazenada em um objeto JSON:
{% highlight javascript %}
let p = JSON.parse(localStorage.getItem("pessoas"))

console.log(p[0])
console.log(p[1].nome)
{% endhighlight %}
