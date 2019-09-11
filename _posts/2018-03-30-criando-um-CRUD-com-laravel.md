---
layout: post
title: "Criando um CRUD com Laravel"
date:   2018-03-30 12:51:00 -0400
categories: php
---

Uma cópia deste projeto pode ser obtida em [app_estoque_laravel](https://github.com/marcoaugustoandrade/app_estoque_laravel)

Pré-requisitos:
* [Configurar o ambiente de desenvolvimento](http://marcoandra.de/php/2018/02/20/configurando-o-ambiente-para-desenvolvimento-web-com-php.html)
* [Configurar o Git Hub localmente](http://marcoandra.de/php/2018/02/20/configurando-localmente-o-acesso-ao-git-hub.html)


## Passo 1: Configuração básica do projeto

1.1: Crie um repositório no [Git Hub](https://github.com/) denominado `app_estoque_laravel`.

1.2: Abra o console (Cmder) e acesse a pasta de projetos:
{% highlight bash %}
cd projetos
{% endhighlight %}

1.3: Crie o aplicativo `app_estoque_laravel` (dentro da pasta projetos) com o seguinte comando:
{% highlight bash %}
composer create-project laravel/laravel app_estoque_laravel
{% endhighlight %}

1.4: Acesse o diretório do aplicativo que acabou de criar:
{% highlight bash %}
cd app_estoque_laravel
{% endhighlight %}

1.5: Inicialize um repositório git:
{% highlight bash %}
git init
{% endhighlight %}

1.6: Adicione o repositório remoto criado no Git Hub: 
{% highlight bash %}
git remote add origin endereço_do_seu_repositório
{% endhighlight %}

1.7: Crie o banco de dados para o projeto:
{% highlight bash %}
mysql -u root -p
create database db_estoque_laravel;
quit
{% endhighlight %}

1.8: Abra o projeto no PhpStorm.

1.9: Edite o arquivo o .env e altere as seguintes configurações:<br>
DB_DATABASE=db_estoque_laravel<br>
DB_USERNAME=root<br>
DB_PASSWORD=Suporte99<br>

1.10: Crie o model Produto no console (Cmder):
{% highlight bash %}
php artisan make:model Produto -m
{% endhighlight %}
<div class="alert-yellow">Todos os models criados ficam na pasta app.</div>

1.11: Configure o migrations criado para este model. Todos os migrations ficam na pasta `database\migrations`. Adicione as seguintes linhas no método `up`:
{% highlight php %}
$table->string('descricao');
$table->integer('quantidade');
$table->decimal('valor', 15, 2);
$table->date('data_vencimento')->nullable();
{% endhighlight %}

1.12: Rode o migrations no console (Cmder) para que a estrutura das tabelas sejam criadas:
{% highlight bash %}
php artisan migrate
{% endhighlight %}

<div class="alert-yellow">Caso queira alterar as estruturas das tabelas no banco de dados você pode usar o comando <b>php artisan migrate:reset</b> e depois rodar novamente o comando <b>php artisan migrate</b> para criar novamente as estruturas das tabelas no banco de dados.</div>

1.13: Configure o seeder abrindo o arquivo `DatabaseSeeder.php` que fica na pasta `database\seeds`. Dentro do método `run` adicione:
{% highlight php %}
DB::insert('insert into produtos (descricao, quantidade, valor, data_vencimento) values (?,?,?,?)', array('Arroz', 10, 10.50, '2018-12-01'));
DB::insert('insert into produtos (descricao, quantidade, valor, data_vencimento) values (?,?,?,?)', array('Feijão', 8, 8.00, '2018-08-24'));
DB::insert('insert into produtos (descricao, quantidade, valor, data_vencimento) values (?,?,?,?)', array('Óleo', 12, 5.99, '2018-10-01'));
DB::insert('insert into produtos (descricao, quantidade, valor, data_vencimento) values (?,?,?,?)', array('Farinha', 20, 3.50, '2018-10-12'));
{% endhighlight %}

1.14: Rode o seeder no console:
{% highlight bash %}
php artisan db:seed
{% endhighlight %}

1.15: Vamos enviar o projeto para o nosso repositório no Git Hub:
{% highlight bash %}
git add .
git commit -m "Estrutura inicial"
git push -u origin master
{% endhighlight %}

## Passo 2: Configuração do projeto em outro computador

2.1: Acesse a pasta de projetos:
{% highlight bash %}
cd projetos
{% endhighlight %}

2.2: Clone o repositório:
{% highlight bash %}
git clone endereço_do repositório
{% endhighlight %}

2.3: Acesse o repositório
{% highlight bash %}
cd app_estoque_laravel
{% endhighlight %}

2.4: Rode o composer para instalar as depências:
{% highlight bash %}
composer install
{% endhighlight %}

2.5: Crie o banco de dados:
{% highlight bash %}
mysql -u root -p
create database db_estoque_laravel
{% endhighlight %}

2.6: Duplique o arquivo .env.example:
{% highlight bash %}
cp .env.example .env
{% endhighlight %}

2.7: Crie a chave criptográfica:
{% highlight bash %}
php artisan key:generate
{% endhighlight %}

2.8: Abra o projeto no PhpStorm.

2.9: Configure o arquivo `.env`:<br>
DB_DATABASE=db_estoque_laravel<br>
DB_USERNAME=root<br>
DB_PASSWORD=Suporte99<br>

2.10: Rode o `migrations` para criar a estrutura no banco de dados:
{% highlight bash %}
php artisan migrate
{% endhighlight %}

2.11: Rodar o `seeder` para popular as tabelas com dados de exemplo:
{% highlight bash %}
php artisan db:seed
{% endhighlight %}

2.12: Subir o servidor:
{% highlight bash %}
php artisan serve
{% endhighlight %}


## Passo 3: Criando um página para listar os produtos

3.1: Crie o controller `ProdutoController` no console:
{% highlight bash %}
php artisan make:controller ProdutoController
{% endhighlight %}
<div class="alert-yellow">Os controllers ficam na pasta app\Http\Controllers</div>

3.2: Abra o ProdutoController e crie o método `pesquisar`:
{% highlight php %}
public function pesquisar()
{

}
{% endhighlight %}

3.3: Abra o arquivo de rotas em `routes\web.php` e adicione a seguinte rota:
{% highlight php %}
Route::get('/produtos/pesquisar', 'ProdutoController@pesquisar');
{% endhighlight %}

3.4: Agora, vamos configurar o método `pesquisar` do nosso ProdutoController:
{% highlight php %}
public function pesquisar()
{
	$produtos = Produto::all();
        foreach ($produtos as $produto){
            echo $produto->descricao . "<br>";
        }
}
{% endhighlight %}
<div class="alert-red">Observação importante: verifique se houve a importação do App\Produto no ProdutoController. Deve estar assim abaixo do namespace: <b>use App\Produto;</b>.</div>
	
3.15: Abra o console e suba o servidor:
{% highlight bash %}
php artisan serve
{% endhighlight %}

3.16: Abra o endereço `http://127.0.0.1:8000/produtos/pesquisar` no  navegador (Chrome, Firefox) e verifique se foram listados todos os produtos da tabela `produtos`.

3.17: A reponsabilidade da interface é da camada view. Então, vamos cria-la.

3.18: Na pasta `resources\views` crie uma pasta denominda `produto`. É nessa pasta que iremos colocar todas as nossas views que trabalham com o model Produto.
Dentro desta pasta crie a view `pesquisar.blade.php`. Edite este arquivo e crie uma estrutura HTML básica.

3.19: Além da estrutura básica (lang, title) vamos adicionar um H1 a nossa view `pesquisar.blade.php`:
{% highlight html %}
<div class="container">
	<h1 class="mt-2">Pesquisa de produtos</h1>
</div>
{% endhighlight %}

3.20: O Laravel já vem com o Bootstrap disponibilizado na pasta `public\css`. Assim, para utilizarmos basta chama-lo no cabeçalho do documento com `<link href="../../css/app.css" rel="stylesheet">` no cabeçalho da view.

3.21: Antes de continuarmos vamos alterar nosso ProdutoController@pesquisar para que ele retorne a view que acabamos de criar:
{% highlight php %}
public function pesquisar()
{
	// Busca todos os produtos do banco de dados
	$produtos = Produto::all();
	
	// Chama a view produto.pesquisar
        return view('produto.pesquisar');
}
{% endhighlight %}

3.22: Abra o endereço `http://127.0.0.1:8000/produtos/pesquisar` no  navegador (Chrome, Firefox) e verifique se a view foi executada.

3.23: Vamos alterar, novamente, o nosso ProdutoController@pesquisar para que os dados do model Produto sejam repassados a nossa view:
{% highlight php %}
public function pesquisar()
{
	// Busca todos os produtos do banco de dados
	$produtos = Produto::all();
	
	// Chama a view produto.pequisar e envia os produtos buscados
        return view('produto.pesquisar')->with('produtos', $produtos);
}
{% endhighlight %}

3.24: Vamos alterar a nossa view `pesquisar.blade.php` para tratar os dados recebidos do nosso controller:
{% highlight html %}
    <div class="container">
	<h1 class="mt-2">Pesquisa de produtos</h1>
        @if(count($produtos) == 0)
            <div class="alert alert-danger mt-2">Nenhum produto encontrado com essa descrição!</div>
        @else
		<table class="table mt-2 text-center">
                <tr>
			<th>Id</th>
			<th class="text-left">Descrição</th>
			<th>Quantidade</th>
			<th>Valor</th>
			<th>Data de vencimento</th>
                </tr>
                @foreach ($produtos as $p)
                    <tr>
                        <td>{ { $p->id } }</td>
                        <td class="text-left"{ { $p->descricao } }</td>
                        <td>{ { $p->quantidade } }</td>
                        <td>{ { $p->valor } }</td>
                        <td>{ { $p->data_vencimento } }</td>
                    </tr>
                @endforeach
            </table>
        @endif
    </div>
{% endhighlight %}

3.25: Abra o endereço `http://127.0.0.1:8000/produtos/pesquisar` no  navegador (Chrome, Firefox) e verifique como a view foi executada.

3.26: Vamos criar um formulário, dentro da nossa view, para que possamos filtrar os resultados:
{% highlight html %}
    
	<h1 class="mt-2">Pesquisa de produtos</h1>
        <form action="/produtos/pesquisar" method="post" class="form-inline mt-2">
            <input type="hidden" name="_token" value="{ { { csrf_token() } } }">
            <div class="form-group">
                <label for="descricao">Descrição: </label>
                <input type="text" id="descricao" name="descricao" class="form-control ml-2">
            </div>
            <input type="submit" class="btn btn-primary ml-2" value="Pesquisar">
        </form>

{% endhighlight %}

<div class="alert-red">
As seguintes observações são importantes:<br>
1) A action deste formulário aponta para a rota /produtos/pesquisar com o método post que precisamos criar no arquivo de rota.<br>
2) É necessário este campo oculto com name _token e o value={ { { csrf_token() } } }.
</div>

3.27: Abra o arquivo `routes\web.php` e adicione a seguinte rota:
{% highlight php %}
Route::post('/produtos/pesquisar', 'ProdutoController@pesquisar');
{% endhighlight %}

3.28: Devemos alterar o nosso método `pesquisar` do ProdutoController para que recebe os dados do formulário e faça um filtro:
{% highlight php %}
public function pesquisar()
{
	// Recebe o conteúdo elemento 'descricao' do formulário
        $descricao = Input::get('descricao');
        
        // Busca produtos com o conteúdo da $descricao
        $produtos = Produto::where('descricao', 'like', '%'.$descricao.'%')->get();
        
        // Chama a view produto.pesquisar e envia os produtos encontrados
        return view('produto.pesquisar')->with('produtos', $produtos);}
{% endhighlight %}
<div class="alert-yellow">Ao digitar a classe Input verifique se foi importado <b>use Illuminate\Support\Facades\Input;</b>.</div>

3.29: Abra o endereço `http://127.0.0.1:8000/produtos/pesquisar` no  navegador (Chrome, Firefox) e verifique e faça um filtro na relação de produtos.


## Passo 4: Inserindo novos produtos

4.1: Inicialmente, precisamos criar uma rota para mostrar o formulário para inserir novos produtos. Abra o arquivo de rotas localizado em `routes\web.php` e adicione a seguinte rota:
{% highlight php %}
Route::get('/produtos/inserir', 'ProdutoController@mostrar_inserir');
{% endhighlight %}

4.2: Abra o ProdutoController em 'App\Http\Controllers' e crie o método `inserir`:
{% highlight php %}
public function mostrar_inserir()
{
	return view('produto.inserir');
}
{% endhighlight %}

4.3: Como o ProdutoController está retornando a view inserir.blade.php precisamos cria-la em 'resources\views\produto'. Edite o arquivo, crie a estrutura HTML básica, altere o lang e o title e adicione o código abaixo para criar o formulário para inserir os novos produtos:
{% highlight html %}
    <div class="container">
        <h1 class="mt-2">Inserir produto</h1>
        <form action="/produtos/inserir" method="post" class="mt-2">
	    <input type="hidden" name="_token" value="{ { { csrf_token() } } }">
            <div class="form-group">
                <label for="descricao">Descrição: <span class="text-danger">*</span></label>
                <input type="text" id="descricao" name="descricao" class="form-control" autofocus required>
            </div>
            <div class="form-group">
                <label for="quantidade">Quantidade: <span class="text-danger">*</span></label>
                <input type="number" id="quantidade" name="quantidade" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="valor">Valor: <span class="text-danger">*</span></label>
                <input type="number" id="valor" name="valor" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="data_vencimento">Data de vencimento: </label>
                <input type="date" id="data_vencimento" name="data_vencimento" class="form-control">
            </div>
            <div>Os campos marcados com <span class="text-danger">*</span> não podem estar em branco.</div>
            <input type="submit" class="btn btn-success mt-2" value="Inserir">
        </form>
    </div>
{% endhighlight %}

<div class="alert-red">Não esqueça do <b>csrf_token()</b>.</div>
Não esqueça do CSS no cabeçalho do arquivo `<link href="../../css/app.css" rel="stylesheet">`.

4.4: Para testar abra o endereço http://127.0.0.1:8000/produtos/inserir no navegador.

4.5: O formulário envia os dados para a rota `/produtos/inserir` com o método post. Assim, precisamos criar está rota no arquivo de rotas localizado em `routes\web.php`:
{% highlight php %}
Route::post('/produtos/inserir', 'ProdutoController@inserir');
{% endhighlight %}

4.6: E, finalmente, para inserir os dados vamos criar o método `inserir` do ProdutoController:
{% highlight php %}
    public function inserir()
    {
        // Criando um novo objeto do tipo Produto
        $produto = new Produto();

        // Colocando os valores recebidos do formulário nos atributos do objeto $produto
        $produto->descricao = Input::get('descricao');
        $produto->quantidade = Input::get('quantidade');
        $produto->valor = Input::get('valor');
        $produto->data_vencimento = Input::get('data_vencimento');

        // Salvando no banco de dados
        $produto->save();

        // Criado uma mensagem para o usuário
        $mensagem = "Produto inserido com sucesso";

        // Chamando a view produto.inserir e enviando a mensagem criada
        return view('produto.inserir')->with('mensagem', $mensagem);
    }
{% endhighlight %}


4.7: Observe que para informamos ao usuário que o nosso produto foi inserido com sucesso vamos passar uma variável `mensagem` e alterar a nossa view `inserir.blade.php`, localizada em `resources\views\produto` para mostrar essa mensagem:
{% highlight html %}
        <h1 class="mt-2">Inserir produto</h1>
        @if(!empty($mensagem))
            <div class="alert alert-success">Produto inserido com sucesso!</div>
        @endif
{% endhighlight %}


## Passo 5: Alterando dados dos produtos

5.1: Os dados serão alterados ou excluídos a partir da página de pesquisa. Então, vamos alterar o nosso arquivo pesquisar.blade.php, disponível na pasta `resources\views\produto`:
{% highlight html %}
        @if(count($produtos) == 0)
            <div class="alert alert-danger mt-2">Nenhum produto encontrado com essa descrição!</div>
        @else
            <table class="table mt-2 text-center">
                <tr>
                    <th>Id</th>
                    <th class="text-left">Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Data de vencimento</th>
                    <th></th>
                    <th></th>
                </tr>
                @foreach ($produtos as $p)
                    <tr>
                        <td>{ { $p->id } }</td>
                        <td class="text-left">{ { $p->descricao } }</td>
                        <td>{ { $p->quantidade } }</td>
                        <td>{ { $p->valor } }</td>
                        <td>{ { $p->data_vencimento } }</td>
                        <td><a href="/produtos/excluir/{ { $p->id } }"><button class="btn btn-danger">Excluir</button></a></td>
                        <td><a href="/produtos/alterar/{ { $p->id } }"><button class="btn btn-warning">Alterar</button></a></td>
                    </tr>
                @endforeach
            </table>
        @endif
{% endhighlight %}

5.2: Observe que adicionamos 2 novas colunas: uma para exclusão de dados e outra para alteração de dados.

5.3: Para testar abra o endereço http://127.0.0.1:8000/produtos/pesquisar no navegador.

5.4: Precisamos criar a rota, disponível em `routes\web.php` para mostrar o formulário:
{% highlight php %}
Route::get('/produtos/alterar/{id}', 'ProdutoController@mostrar_alterar');
{% endhighlight %}

5.5: Bem como, criar o método `mostrar_alterar` dentro do ProdutoController, disponível em `app\Http\Controllers` para que a view produto.alterar seja chamada:
{% highlight php %}
    public function mostrar_alterar()
    {
        return view('produto.alterar');
    }
{% endhighlight %}

5.6: E agora vamos criar a view `alterar.blade.php` dentro da pasta `resources\views\produto`:
{% highlight html %}
<div class="container">
    <h1 class="mt-2">Alterar produto</h1>
    <form action="/produtos/alterar" method="post" class="mt-2">
        <input type="hidden" name="_token" value="{ { { csrf_token() } } }">
        <div class="form-group">
            <label for="id">ID: <span class="text-danger">*</span></label>
            <input type="text" id="id" name="id" class="form-control" autofocus required readonly>
        </div>
        <div class="form-group">
            <label for="descricao">Descrição: <span class="text-danger">*</span></label>
            <input type="text" id="descricao" name="descricao" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="quantidade">Quantidade: <span class="text-danger">*</span></label>
            <input type="number" id="quantidade" name="quantidade" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="valor">Valor: <span class="text-danger">*</span></label>
            <input type="number" id="valor" name="valor" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="data_vencimento">Data de vencimento: </label>
            <input type="date" id="data_vencimento" name="data_vencimento" class="form-control">
        </div>
        <div>Os campos marcados com <span class="text-danger">*</span> não podem estar em branco.</div>
        <input type="submit" class="btn btn-success mt-2" value="Alterar">
    </form>
</div>
{% endhighlight %}

<div class="alert-yellow">Não esqueça de criar a estrutura básica do documento HTML, alterar o lang e o title e importar o CSS.</div>

5.7: Vamos alterar o nosso método `mostrar_alterar` para que capture os dados e envie a view `alterar.blade.php`:
{% highlight php %}
    public function mostrar_alterar($id)
    {
        // Busca no banco o registro com o id recebido
        $produto = Produto::find($id);
        
        // Envia os dados deste registro a view produto.alterar
        return view('produto.alterar')->with('produto', $produto);
    }
{% endhighlight %}

5.8: E com os dados passados pelo controller vamos inseri-los no nosso formulário:
{% highlight html %}
<div class="container">
    <h1 class="mt-2">Alterar produto</h1>
    <form action="/produtos/alterar" method="post" class="mt-2">
        <input type="hidden" name="_token" value="{ { { csrf_token() } } }">
        <div class="form-group">
            <label for="id">ID: <span class="text-danger">*</span></label>
            <input type="text" id="id" name="id" class="form-control" required readonly value="{ { $produto->id } }">
        </div>
        <div class="form-group">
            <label for="descricao">Descrição: <span class="text-danger">*</span></label>
            <input type="text" id="descricao" name="descricao" class="form-control" autofocus required value="{ { $produto->descricao } }">
        </div>
        <div class="form-group">
            <label for="quantidade">Quantidade: <span class="text-danger">*</span></label>
            <input type="number" id="quantidade" name="quantidade" class="form-control" required value="{ { $produto->quantidade } }">
        </div>
        <div class="form-group">
            <label for="valor">Valor: <span class="text-danger">*</span></label>
            <input type="number" id="valor" name="valor" class="form-control" required value="{ { $produto->valor } }">
        </div>
        <div class="form-group">
            <label for="data_vencimento">Data de vencimento: </label>
            <input type="date" id="data_vencimento" name="data_vencimento" class="form-control" value="{ { $produto->data_vencimento } }">
        </div>
        <div>Os campos marcados com <span class="text-danger">*</span> não podem estar em branco.</div>
        <input type="submit" class="btn btn-success mt-2" value="Alterar">
    </form>
</div>
{% endhighlight %}

5.9: Para finalizar devemos criar a rota `/produtos/alterar`, chamada pelo método post do formulário:
{% highlight php %}
Route::post('/produtos/alterar', 'ProdutoController@alterar');
{% endhighlight %}

5.10: E criar o método `alterar` no ProdutoController:
{% highlight php %}
    public function alterar()
    {
        $id = Input::get('id');
        $p = Produto::find($id);

        $p->descricao = Input::get('descricao');
        $p->quantidade = Input::get('quantidade');
        $p->valor = Input::get('valor');
        $p->data_vencimento = Input::get('data_vencimento');

        $p->save();

        $mensagem = "Produto alterado com sucesso!";
        $produtos = Produto::all();
        return view('produto.pesquisar')->with('mensagem', $mensagem)->with('produtos', $produtos);
    }
{% endhighlight %}

5.11: Como nós estamos chamando a view pesquisar.blade.php, disponível em `resources\views\produto` e enviando uma variável vamos realizar a alteração:
{% highlight html %}
        <h1 class="mt-2">Pesquisa de produtos</h1>
        @if(!empty($mensagem))
            <div class="alert alert-success mt-2">{ { $mensagem } }</div>
        @endif
{% endhighlight %}


## Passo 6: Excluindo dados dos produtos

6.1: Na view pesquisar.blade.php nós já criamos o link para a rota para excluir um produto. Assim, devemos criar esta rota no arquivo `routes\web.php`:
{% highlight php %}
Route::get('/produtos/excluir/{id}', 'ProdutoController@excluir');
{% endhighlight %}

6.2: No nosso ProdutoController, disponível em 'app\Http\Controllers' vamos criar o método `excluir`:
{% highlight php %}
    public function excluir($id)
    {
        // Criando um objeto com o id recebido pela rota
        $produto = Produto::find($id);

        // Excluindo este objeto
        $produto->delete();

        // Criando uma mensagem para ser enviada a view produto.pesquisar
        $mensagem = "Produto excluído com sucesso!";

        // Capturando objetos para enviar a view produto.pesquisar
        $produtos = Produto::all();

        // Retornando a view produto.pesquisar
        return view('produto.pesquisar')->with('mensagem', $mensagem)->with('produtos', $produtos);
    }
{% endhighlight %}
