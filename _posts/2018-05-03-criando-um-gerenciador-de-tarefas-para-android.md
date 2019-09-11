---
layout: post
title: "Criando um Gerenciador de Tarefas para Android"
date:   2018-05-03 14:50:00 -0400
categories: android
---

## Passo 1: Criação do projeto

1.1: Crie um novo projeto no Android Studio com o as seguintes configurações:
* Nome: Tarefas
* Domínio: ads.vilhena.ifro.edu.br
* Local: C:\Users\USUARIO\projetos\Tarefas ou /home/USUARIO/projetos/Tarefas

1.2: Certifique-se que esteja selecionado a API 16: Android 4.1 (Jelly Bean).

1.3: Crie a activity ListarTarefasActivity do tipo Empty Activity.

Aguarde o Gradle executar.


## Passo 2: Listando tarefas

2.1: Abra o arquivo activity_listar_tarefas.xml (app\res\layout).

2.2: Exclua o componente TextView com o texto Hello World.

2.3: Adicionar um componente ListView a activity.

2.4: Ancore nas bordas com margin de 8.

2.5: Mude as propriedades `layout_width` e o `layout_height` para `match_constraint`.

2.6: Adicione o ID `lsv_listar_tarefas` ao ListView.

2.7: Abra o arquivo ListarTarefasActivity.java (app\java\br.edu.ifro.vilhena.ads).

2.8: Declare um atributo para ser vinculado a ListView da activity_listar_tarefas.xml:
{% highlight java %}
    private ListView lsvListarTarefas;
{% endhighlight %}

2.9: No método onCreate vamos realizar a vinculação:
{% highlight java %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listar_tarefas);

        lsvListarTarefas = (ListView) findViewById(R.id.lsv_listar_tarefas);
    }
{% endhighlight %}

<div class="alert-red">Caso o id do ListView não esteja aparecendo vá ao menu Build > Clean project.</div>

2.10: Vamos criar o nosso model clicando com o botão direito no pacote ads.vilhena.ifro.edu.br (app\java), selecionando a opção New > Java Class e inserindo as seguintes informações:
* Name: Tarefa
* Kind: Class
* Package: br.edu.ifro.vilhena.ads.tarefas.model

2.11: Com a classe implementada adicione os seguintes atributos:
{% highlight java %}
    public class Tarefa {
        private int id;
        private String descricao;
        private boolean realizado = false;
        private long dataHora;
    }
{% endhighlight %}

2.12: Gere os métodos getters e setters para todos os atributos.

<div class="alert-blue">Para gerar os métodos getters e setters basta apertar os botões ALT + Insert e selecionar a opção necessária, observando que na caixa de diálogo é necessário selecionar todos os campos.</div>

2.13: Vamos aproveitar e criar 2 construtores, que serão necessários no decorrer deste projeto. Aperte os botões ALT + Insert e selecione a opção `Constructor` e selecione os atributos id e descricao, criando um construtor da seguinte maneira:
{% highlight java %}
    public Tarefa(int id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }
{% endhighlight %}

2.14: Aperte novamente os botões ALT + Insert, selecione a opção `Constructor` e não selecione nenhum atributo, criando um construtor da seguinte maneira:
{% highlight java %}    
    public Tarefa() {
    }
{% endhighlight %}

2.15: Agora vamos no arquivo ListarTarefasActivity.java e declare o seguinte atributo:
{% highlight java %}
    private List<Tarefa> tarefas;
{% endhighlight %}

2.16: Dentro do método `onCreate`, vamos criar uma lista de tarefas para que possamos verificar como será o comportamento do nosso ListView:
{% highlight java %}	
        tarefas =  new ArrayList<Tarefa>();

        Tarefa t1 = new Tarefa(1, "Pagar boleto de energia");
        Tarefa t2 = new Tarefa(2, "Estudar para a prova de matemática");
        Tarefa t3 = new Tarefa(3, "Compra biscoito");

        tarefas.add(t1);
        tarefas.add(t2);
        tarefas.add(t3);
{% endhighlight %}

<div class="alert-red">Caso a classe Tarefa fique vermelha, ou seja, dizendo que não encontrou, basta digitar ALT + Enter (em cima do item) que a importação será realizada.</div>

2.17: Para vincular a nossa lista de tarefas ao nosso ListView precisamos de um adapter. Assim, no final do método `onCreate` adicione:
{% highlight java %}
    ArrayAdapter<Tarefa> adapter = new ArrayAdapter<Tarefa>(this, android.R.layout.simple_list_item_1, tarefas);
{% endhighlight %}

2.18: Em seguida, vamos setar o nosso adapter ao ListView:
{% highlight java %}
    lsvListarTarefas.setAdapter(adapter);
{% endhighlight %}

2.19: O código do método `onCreate` vai ficar assim:
{% highlight java %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listar_tarefas);

        lsvListarTarefas = (ListView) findViewById(R.id.lsv_listar_tarefas);

        tarefas =  new ArrayList<Tarefa>();

        Tarefa t1 = new Tarefa(1, "Pagar boleto de energia");
        Tarefa t2 = new Tarefa(2, "Estudar para a prova de matemática");
        Tarefa t3 = new Tarefa(3, "Compra biscoito");

        tarefas.add(t1);
        tarefas.add(t2);
        tarefas.add(t3);

        ArrayAdapter<Tarefa> adapter = new ArrayAdapter<Tarefa>(this, android.R.layout.simple_list_item_1, tarefas);

        lsvListarTarefas.setAdapter(adapter);
    }
{% endhighlight %}

2.20: Execute o aplicação e veja o resultado:

<div class="alert-yellow">Observe que foi impressa a assinatura do objeto e para corrigir isso vamos sobrescrever o método toString da classe.</div>

2.21: Abra a nossa classe Tarefa (app\java\br.edu.ifro.vilhena.ads\model), aperte as teclas `ALT + Insert`, selecione a opção `toString` e deixe o método da seguinte forma:
{% highlight java %} 
    @Override
    public String 
    toString() {
        return id + " - " + descricao + " - " + realizado + " - " + dataHora;
    }
{% endhighlight %}

2.22: Execute novamente a aplicação e veja o resultado.


Passo 3: Trabalhar com a persistência de dados utilizando o Framework Room

3.1: Adicione as dependências do framework de persistência Room. Para isso, abra `Gradle Scripts\build.gradle (Module: app)`, e dentro de dependencies adicione as seguintes linhas:
{% highlight java %}
    // ViewModel and LiveData
    implementation "android.arch.lifecycle:extensions:1.1.1"
    annotationProcessor "android.arch.lifecycle:compiler:1.1.1"
    // Room (use 1.1.0-beta3 for latest beta)
    implementation "android.arch.persistence.room:runtime:1.0.0"
    annotationProcessor "android.arch.persistence.room:compiler:1.0.0"
    // Paging
    implementation "android.arch.paging:runtime:1.0.0-rc1"
    // Test helpers for LiveData
    testImplementation "android.arch.core:core-testing:1.1.1"
    // Test helpers for Room
    testImplementation "android.arch.persistence.room:testing:1.0.0"
    implementation 'com.android.support:design:27.1.1'
{% endhighlight %}

3.2: Agora clique no botão `Sync now` para que o Gradle baixe as dependências.

3.3: Abra a nossa classe Tarefa (app\br.edu.ifro.vilhena.ads.tarefas\model) e faça as seguinte anotações:
{% highlight java %}
    @Entity(tableName = "tarefas")
    public class Tarefa {

        @PrimaryKey(autoGenerate = true)
        private int id;

{% endhighlight %}

<div class="alert-green">Estamos definindo, com anotações, que a nossa classe Tarefa será mapeada em uma tabela denominada tarefas, bem como, o atributo id será nossa chave primária gerada automaticamente.</div>

3.4: Vamos criar o nosso TarefaDAO. Clique com o botão direito no pacote br.edu.ifro.vilhena.ads, selecione a opção New > Java Class e configure da seguinte forma:
* Name: TarefaDAO
* Kind: inteface
* Package: br.edu.ifro.vilhena.ads.tarefas.DAO

3.5: Com a nossa inteface TarefaDAO aberta iremos fazer as anotações e os métodos??? necessários:
{% highlight java %}
@Dao
public interface TarefaDAO {

    @Query("select * from tarefas")
    List<Tarefa> listarTodos();

    @Query("select * from tarefas where id = :id")
    Tarefa listarUm(int id);
    
    @Insert
    void inserir(Tarefa tarefa);
    
    @Update
    void alterar(Tarefa tarefa);
    
    @Delete
    void deletar(Tarefa tarefa);
}
{% endhighlight %}

3.6: Vamos criar uma classe para ser intermediária entre o banco de dados e a aplicação: Dentro do pacote DAO (app\br.edu.ifro.vilhena.ads.tarefas\DAO) crie uma classe com a seguintes caracteristicas:
* Name: AppDatabase
* Kind: Class
* Superclass: android.arch.persistence.room.RoomDatabase
* Marque como Abstract

3.7: Em seguida, adicione a seguinte marcação na classe informado quais são as entidades a serem persistidas, bem como, qual a versão do banco de dados:
{% highlight java %}
@Database(entities = {Tarefa.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
}
{% endhighlight %}

3.8: Nessa classe nós teremos, inicialmente, 1 método abstrato para o DAO da nossa entidade que será persistida, e 2 atributos: um para determinar qual será o nome do banco de dados e um para guardar uma instância dessa classe (iremos utilizar o padrão singleton):
{% highlight java %}
    
    public abstract TarefaDAO tarefaDAO();
    
    private static final String DB_NAME = "db_tarefas";
    private static AppDatabase appDatabase;

{% endhighlight %}

3.9: Agora vamos criar um método, utilizando o padrão singleton, para criar uma instância de AppDatabase ou retornar a instância criada:
{% highlight java %}
    public static AppDatabase getAppDatabase(Context context){
        if (appDatabase == null){
            appDatabase = Room.databaseBuilder(context, AppDatabase.class, DB_NAME)
                    .fallbackToDestructiveMigration()
                    .allowMainThreadQueries()
                    .build();
        } return appDatabase;
    }
{% endhighlight %}


## Passo 4: Criando um activity para cadastrar tarefas

4.1: Clique com o botão direito em `app`, selecione a opção New > Activity > Empyt Activity e crie uma nova activity com as seguintes configurações:
* Activity name: CadastrarTarefaActivity
* Layout name: activity_cadastrar_tarefa

4.2: Abra o arquivo activity_cadastrar_tarefa.xml (app\res\layout) e adicione um `TextInputLayout`, dois `TextView` e um `Button`. Faça as ancoragens necessárias.

<div class="alert-yellow">Para facilitar, utilize a tecla B para alternar entre os modos de visualização.</div>

4.3: Altere o ID do TextInputLayout para `til_descricao`. Clique no componente TextInputEditText (que está dentro do componente TextInputLayout) e altere o hint para `Descrição:`.

4.4: Altere o ID de um dos TextView para `txt_data` e o text para "Selecionar data", bem como, altere o ID do outro TextView para `txt_hora` e o text para "Selecionar horário".

4.5: Altere o ID do Button para `btn_salvar` e o text para `SALVAR TAREFA`.

4.6: Abra o arquivo CadastrarTarefaActivity.java (app\java\br.edu.ifro.vilhena.ads.tarefas) e crie quatro atributos para realizar a vinculação com os componentes da activity:
{% highlight java %} 
    private TextInputLayout tilDescricao;
    private TextView txtData;
    private TextView txtHora;
    private Button btnSalvar;
{% endhighlight %}

4.7: Dentro do método `onCreate` vamos fazer a vinculação:
{% highlight java %}
    tilDescricao = (TextInputLayout) findViewById(R.id.til_descricao);
	txtData = (TextView) findViewById(R.id.txt_data);
	txtHora = (TextView) findViewById(R.id.txt_hora);
    btnSalvar = (Button) findViewById(R.id.btn_salvar);
{% endhighlight %}

4.8: Declare um atributo para receber a data e hora da tarefa:
{% highlight java %}
    private Calendar dataHora = Calendar.getInstance();
{% endhighlight %}

4.9: Vamos programar para que, quando houver o click no TextView `txtData` seja aberta uma caixa de diálogo do tipo `DatePickerDialog`, ficando mais prático para o usuário selecionar a data da tarefa. Dentro do método `onCreate` vamos criar o listener:
{% highlight java %}
    txtData.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            new DatePickerDialog(CadastrarTarefaActivity.this, d, dataHora.get(Calendar.YEAR), dataHora.get(Calendar.MONTH), dataHora.get(Calendar.DAY_OF_MONTH)).show();
        }
    });
{% endhighlight %}

<div class="alert-red">O método d será implementado no passo 4.10</div>

4.10: Observe que o `DatePickerDialog` está solicitando a implementação do método d, então, vamos criar esse método na classe, ou seja, fora do método `onCreate`:
{% highlight java %}
    DatePickerDialog.OnDateSetListener d = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            dataHora.set(Calendar.YEAR, year);
            dataHora.set(Calendar.MONTH, month);
            dataHora.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            SimpleDateFormat formatacao = new SimpleDateFormat("dd/MM/yyyy");
            txtData.setText(formatacao.format(dataHora.getTime()));
        }
    };
{% endhighlight %}

4.11: Da mesma forma, quando houver o click no TextView `txtHora` será aberta uma caixa de diálogo do tipo `TimePickerDialog`. Dentro do método `onCreate` implemente o listener:
{% highlight java %}
    txtHora.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            new TimePickerDialog(CadastrarTarefaActivity.this, t, dataHora.get(Calendar.HOUR), dataHora.get(Calendar.MINUTE), true).show();
        }
    });
{% endhighlight %}

4.12: E também criar o método t dentro da classe:
{% highlight java %}
    TimePickerDialog.OnTimeSetListener t = new TimePickerDialog.OnTimeSetListener() {
        @Override
        public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
            dataHora.set(Calendar.HOUR, hourOfDay);
            dataHora.set(Calendar.MINUTE, minute);
            SimpleDateFormat formatacao = new SimpleDateFormat("HH:mm");
            txtHora.setText(formatacao.format(dataHora.getTime()));
        }
    };
{% endhighlight %}


4.13: Para que a nossa activity de cadastro seja executado precisamos colocar um FloatActionButton na activity activity_listar_tarefas.xml. Entre no endereço https://material.io/icons/, procure por `add`, clique no ícone, selecione o fundo branco e baixe no formato PNGS. Extraia o conteúdo do arquivo na pasta de Downloads, e procure, dentro de ic_add_white_24dp/android/drawable-hdpi o arquivo ic_add_white_24dp.png e cole, no Android Studiol, dentro da pasta `drawable`. Adicione um FloatActionButton no layout da activity, selecionando o ícone que acabamos de colocar no projeto, altere o seu ID para `fab_cadastrar_tarefa` e o posicione a 24dp da direita e 24dp do bottom.

4.14: Abra a classe ListarTarefasActivity.java (app\java\br.edu.ifro.vilhena.ads.tarefas) e crie um atributo para vincular ao componente FloatingActionButton que criamos na activity:
{% highlight java %}
    private FloatingActionButton fabCadastrarTarefa;
{% endhighlight %}

4.15: Faça a vinculação dentro do método `onCreate`:
{% highlight java %}
    fabCadastrarTarefa = (FloatingActionButton) findViewById(R.id.fab_cadastrar_tarefa);
{% endhighlight %}

4.16: Agora vamos programar o comportamento do botão, que nesse caso é chamar a activity CadastrarTarefaActivity. Dentro do método `onCreate` adicione o listener:
{% highlight java %}
    fabCadastrarTarefa.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            Intent intent = new Intent(ListarTarefasActivity.this, CadastrarTarefaActivity.class);
            startActivity(intent);
        }
    });
{% endhighlight %}

4.17: Execute a aplicação e verifique se, ao clicar no FloatActionButton, a activity CadastrarTarefaActivity foi executada.

4.18: Retornando a nossa activity CadastrarTarefaActivity (app\java\br.edu.ifro.vilhena.ads.tarefas), vamos programar o listener do botão Salvar, dentro do método `onCreate`:
{% highlight java %}
    btnSalvar.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Tarefa tarefa = new Tarefa();
            tarefa.setDescricao(tilDescricao.getEditText().getText().toString().trim());
            tarefa.setDataHora(dataHora.getTimeInMillis());
            AppDatabase.getAppDatabase(CadastrarTarefaActivity.this).tarefaDAO().inserir(tarefa);
            finish();
        }
    });
{% endhighlight %}

4.19: Execute a aplicação e realizando pelo menos 2 cadastros.

4.20: Para que, ao finalizar a activity de cadastro os dados da ListView da activity sejam atualizados com os dados do banco de dados, precisamos remover do método `onCreate` os objetos que criamos anteriormente, e mover o adapter para o método `onStart` que iremos sobrescrever. Os métodos vão ficar assim:
{% highlight java %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listar_tarefas);

        lsvListarTarefas = (ListView) findViewById(R.id.lsv_listar_tarefas);
        fabCadastrarTarefa = (FloatingActionButton) findViewById(R.id.fab_cadastrar_tarefa);

        fabCadastrarTarefa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListarTarefasActivity.this, CadastrarTarefaActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        tarefas = AppDatabase.getAppDatabase(this).tarefaDAO().listarTodos();
        ArrayAdapter<Tarefa> adapter = new ArrayAdapter<Tarefa>(this, android.R.layout.simple_list_item_1, tarefas);
        lsvListarTarefas.setAdapter(adapter);
    }
{% endhighlight %}

4.21: Uma boa prática é informar ao usuário o que acontece através de uma mensagem. Assim, vamos realizar uma modificação no setOnClickListener do fabCadastrarTarefa para que seja esperado um retorno da intent:
{% highlight java %}
	fabCadastrarTarefa.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(ListarTarefasActivity.this, CadastrarTarefaActivity.class);
            startActivityForResult(intent, 1);
        }
    });
{% endhighlight %}

4.22: Vamos sobrescrever o método onActivityResult para tratar a resposta que vamos receber:
{% highlight java %}
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == 1){
            Snackbar.make(findViewById(R.id.layout_listar_tarefas), "Tarefa cadastrada com sucesso!", Snackbar.LENGTH_LONG).show();
        }
    }
{% endhighlight %}

<div class="alert-red">Veja que é necessário colocar um ID, no caso layout_listar_tarefas, no layout do XML activity_listar_tarefas.</div>

4.23: Na classe CadastrarTarefaActivity.class (app\java\br.edu.ifro.vilhena.ads.tarefas) vamos alterar o setOnClickListener do btnSalvar para que seja retornado um resultado:
{% highlight java %}
    btnSalvar.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Tarefa tarefa = new Tarefa();
            tarefa.setDescricao(tilDescricao.getEditText().getText().toString().trim());
            tarefa.setDataHora(dataHora.getTimeInMillis());
            AppDatabase.getAppDatabase(CadastrarTarefaActivity.this).tarefaDAO().inserir(tarefa);
            Intent intent = new Intent();
            intent.putExtra("resposta", "OK");
            setResult(RESULT_OK, intent);
            finish();
        }
    });
{% endhighlight %}

4.24: Vamos retornar a nossa classe CadastrarTarefaActivity.java e para que seja implementada a validação dos dados. Crie o método validarDescricao:
{% highlight java %}	
    public boolean validarDescricao(){
        if (tilDescricao.getEditText().getText().toString().trim().equals("")){
            tilDescricao.setError("A descrição da tarefa não pode estar em branco!");
            return false;
        }
        tilDescricao.setError(null);
        return true;
    }
{% endhighlight %}

4.25: Em sequência, vamos alterar o setOnClickListener do btnSalvar para utilizar o método de validação antes de realizar alguma inserção no banco de dados:
{% highlight java %}
    btnSalvar.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if (validarDescricao()) {
                Tarefa tarefa = new Tarefa();
                tarefa.setDescricao(tilDescricao.getEditText().getText().toString().trim());
                tarefa.setDataHora(dataHora.getTimeInMillis());
                AppDatabase.getAppDatabase(CadastrarTarefaActivity.this).tarefaDAO().inserir(tarefa);
                Intent intent = new Intent();
                intent.putExtra("resposta", "OK");
                setResult(RESULT_OK, intent);
                finish();
            }
        }
    });
{% endhighlight %}

4.26: Execute a aplicação e realize os testes.


## Passo 5: Melhorando a nossa ListView

5.1: Clique com o botão direito na pasta layout (app\res), selecione a opção `New layout resource file` e nomeie como `adapter_listar_tarefas`.

5.2: Ao abrir o arquivo adicione dois `TextView` e faça as ancoragens.

5.3: Nomeie o primeiro como `txt_item_descricao`, coloque o texto `Descrição da tarefa` na propriedade text, marque `B` na propriedade textStyle e coloque o textSize com 16sp.

5.4: Nomeie o segundo TextView como `txt_item_data_hora` e coloque o texto `30/04/2018 14:00` na propriedade text. 

5.5: Para finalizar a edição, selecione o layout e mude a propriedade layout_height para wrap_content.

5.6: Vamos criar a classe ListarTarefasAdapter com as seguintes caracteristicas:
* Name: ListarTarefasAdapter
* Superclass: android.widget.BaseAdapter
* Package: br.edu.ifro.ads.tarefas.adapter

<div class="alert-red">Observe que ao abrir a classe criada será necessário implementar 4 métodos.</div>

5.7: Adicione os seguintes atributos a classe ListarTarefasAdapter:
{% highlight java %}
	private final List<Tarefa> tarefas;
    private final Activity activity;
{% endhighlight %}

5.8: Implemente o construtor conforme solicitado:
{% highlight java %}
    public ListarTarefasAdapter(List<Tarefa> tarefas, Activity activity) {
        this.tarefas = tarefas;
        this.activity = activity;
    }
{% endhighlight %}

5.9: Altere o método getCount para retornar a quantidade de itens da nossa lista de tarefas:
{% highlight java %}
    @Override
    public int getCount() {
        return tarefas.size();
    }
{% endhighlight %}    

5.10: Altere o método getItem para retornar um determinado item da lista:
{% highlight java %}
    @Override
    public Object getItem(int position) {
        return tarefas.get(position);
    }
{% endhighlight %}

5.11: Altere o método getItemId:
{% highlight java %}
    @Override
    public long getItemId(int position) {
        return tarefas.get(position).getId();
    }
{% endhighlight %}

5.12: Altere o método getView para que retorne o layout adapter_listar_tarefas:
{% highlight java %}
@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = activity.getLayoutInflater().inflate(R.layout.adapter_listar_tarefas, parent, false);
        Tarefa tarefa = tarefas.get(position);
        TextView txtItemDescricao = (TextView) view.findViewById(R.id.txt_item_descricao);
        TextView txtItemDataHora = (TextView) view.findViewById(R.id.txt_item_data_hora);
        txtItemDescricao.setText(tarefa.getDescricao());
        SimpleDateFormat formatacao = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        txtItemDataHora.setText(formatacao.format(tarefa.getDataHora()));
        return view;
    }
{% endhighlight %}

5.13: Precisamos alterar no método onStart da nossa classe ListarTarefasActivity.class para que a mesma utilize o adapter que acabamos de criar, bem como, que a lista de tarefas seja listada a partir do banco de dados:
{% highlight java %}
@Override
    protected void onStart() {
        super.onStart();
        tarefas = AppDatabase.getAppDatabase(this).tarefaDAO().listarTodos();
        ListarTarefasAdapter adapter = new ListarTarefasAdapter(tarefas, this);
        lsvListarTarefas.setAdapter(adapter);
    }
{% endhighlight %}

5.14: Para finalizar, vamos colocar o botão voltar na activity de cadastro. Abrar o arquivo AndroidManifest.xml (app\manifests) e adicione 
{% highlight xml %}
    <activity android:name=".CadastrarTarefaActivity"
              android:parentActivityName=".ListarTarefasActivity"></activity>
{% endhighlight %}


## Passo 6: Alterando os dados de uma tarefa

6.1: Clique com o botão direito em app > New > Activity > Empty activity e nomeie como AlterarTarefaActivity

6.2: Abra o arquivo activity_alterar_tarefa e adicione um TextInputLayout, dois TextView, um Switch, um Button, e realize as ancoragens.

6.3: Altere o ID do TextInputLayout para til_alterar_descricao. Clique no TextInputEditText interno e altere o hint para "Descrição:".

6.4: Altere os IDs dos TextView para txt_alterar_data e txt_alterar_hora. Altere os text para "Selecionar data" e "Selecionar horário".

6.5: Altere o ID do Switch para swt_realizado e o text para "Realizado".

6.6: Altere o ID do Button para btn_alterar e o text para "ALTERAR".

6.7: Abra a classe AlterarTarefaAcitivy.java (app\br.edu.ifro.vilhena.ads) e declare os atributos:
{% highlight java %}
    private TextInputLayout tilAlterarDescricao;
    private TextView txtAlterarData;
    private TextView txtAlterarHora;
    private Switch swtRealizado;
    private Button btnAlterar;
    private Calendar dataHora = Calendar.getInstance();
    private Tarefa tarefa;
{% endhighlight %}

6.8: E no método `onCreate` vamos realizar a vinculação:
{% highlight java %}
    tilAlterarDescricao = (TextInputLayout) findViewById(R.id.til_alterar_descricao);
    txtAlterarData = (TextView) findViewById(R.id.txt_alterar_data);
    txtAlterarHora = (TextView) findViewById(R.id.txt_alterar_hora);
    swtRealizado = (Switch) findViewById(R.id.swt_realizado);
    btnAlterar = (Button) findViewById(R.id.btn_alterar);
{% endhighlight %}

6.9: Vamos alterar a classe ListarTarefasActivity.java (app\br.edu.ifro.vilhena.ads) para que ao clicar em um item da nossa ListView a activity de alteração seja chamada. Assim, no método `onCreate` crie o setOnItemClickListener no lsvListarTarefas:
{% highlight java %}
    lsvListarTarefas.setOnItemClickListener(new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Intent intent = new Intent(ListarTarefasActivity.this, AlterarTarefaActivity.class);
            intent.putExtra("id_tarefa", tarefas.get(position).getId());
            startActivityForResult(intent, 2);
        }
    }); 
{% endhighlight %}

6.10: Voltando a AlterarTarefasActivity.java (app\br.edu.ifro.vilhena.ads), em seu método `onCreate` vamos popular o formulário com o id recebido:
{% highlight java %}
    Intent intent = getIntent();
    Bundle args = intent.getExtras();
    int id = args.getInt("id_tarefa");
    tarefa = AppDatabase.getAppDatabase(this).tarefaDAO().listarUm(id);

    tilAlterarDescricao.getEditText().setText(tarefa.getDescricao());

    SimpleDateFormat formatarData = new SimpleDateFormat("dd/MM/yyyy");
    txtAlterarData.setText(formatarData.format(tarefa.getDataHora()));

    SimpleDateFormat formatarHora = new SimpleDateFormat("HH:mm");
    txtAlterarHora.setText(formatarHora.format(tarefa.getDataHora()));

    swtRealizado.setChecked(tarefa.isRealizado());
{% endhighlight %}

6.11: Execute a aplicação e veja se, ao clicar em um dos itens da nossa ListView, a activity para alteração é executada e os dados inseridos no formulário.

6.12: Antes de persistir vamos implementar a funcionalidade das caixas de diálogo da data e da hora. Assim, dentro do método `onCreate` da activity AlterarTarefaActivity.java implemente:
{% highlight java %}
    txtAlterarData.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            new DatePickerDialog(AlterarTarefaActivity.this, d, dataHora.get(Calendar.YEAR), dataHora.get(Calendar.MONTH), dataHora.get(Calendar.DAY_OF_MONTH)).show();
        }
    });

    txtAlterarHora.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            new TimePickerDialog(AlterarTarefaActivity.this, t, dataHora.get(Calendar.HOUR), dataHora.get(Calendar.MINUTE), true).show();
        }
    });
{% endhighlight %}     

6.13: Implemente como métodos da classe:
{% highlight java %}
    DatePickerDialog.OnDateSetListener d = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            dataHora.set(Calendar.YEAR, year);
            dataHora.set(Calendar.MONTH, month);
            dataHora.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            SimpleDateFormat formatacao = new SimpleDateFormat("dd/MM/yyyy");
            txtAlterarData.setText(formatacao.format(dataHora.getTime()));
        }
    };

    TimePickerDialog.OnTimeSetListener t = new TimePickerDialog.OnTimeSetListener() {
        @Override
        public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
            dataHora.set(Calendar.HOUR, hourOfDay);
            dataHora.set(Calendar.MINUTE, minute);
            SimpleDateFormat formatacao = new SimpleDateFormat("HH:mm");
            txtAlterarHora.setText(formatacao.format(dataHora.getTime()));
        }
    };
{% endhighlight %}

6.14: Teste a aplicação e veja se, ao clicar nos TextView, as caixas de diálogo do calendário e da hora são exibidas.

6.15: Em seguida, vamos implementar o método para salavar as alterações. No método `onCreate` crie o setOnClickListener do botão:
{% highlight java %}
    btnAlterar.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            tarefa.setDescricao(tilAlterarDescricao.getEditText().getText().toString().trim());
            tarefa.setDataHora(dataHora.getTimeInMillis());
            tarefa.setRealizado(swtRealizado.isChecked());
            
            AppDatabase.getAppDatabase(AlterarTarefaActivity.this).tarefaDAO().alterar(tarefa);

            Intent intent = new Intent();
            intent.putExtra("resposta", "OK");
            setResult(RESULT_OK, intent);
            finish();
        }
    });
{% endhighlight %}

6.16: Vamos implementar a mensagem no método onActivityResult da classe ListarTarefasActivity:
{% highlight java %}
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == 1){
            Snackbar.make(findViewById(R.id.layout_listar_tarefas), "Tarefa cadastrada com sucesso!", Snackbar.LENGTH_LONG).show();
        } else if (resultCode == RESULT_OK && requestCode == 2){
            Snackbar.make(findViewById(R.id.layout_listar_tarefas), "Tarefa alterada com sucesso!", Snackbar.LENGTH_LONG).show();
        }
    }
{% endhighlight %}

6.17: Vamos modificar o nosso ListarTarefasAdapter.java (app\br.edu.ifro.vilhena.ads\adapter) para que, visualmente, as tarefas realizadas fiquem diferenciadas na ListView. Dentro do método getView adicione:
{% highlight java %}
	if (tarefa.isRealizado()){
        txtItemDescricao.setTextColor(Color.RED);
        txtItemDescricao.setPaintFlags(txtItemDescricao.getPaintFlags()| Paint.STRIKE_THRU_TEXT_FLAG);
    }
{% endhighlight %}


## Passo 7: Criando um menu de contexto para os itens da ListView

7.1: Abra o ListarTarefasActivity.java (app\br.edu.ifro.vilhena.ads) e dentro do método `onCreate` crie o seguinte listener:
{% highlight java %}
    lsvListarTarefas.setOnCreateContextMenuListener(new View.OnCreateContextMenuListener() {
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        MenuItem compartilhar = menu.add("Compartilhar");
        MenuItem deletar = menu.add("Deletar"); 
    }});
{% endhighlight %}

7.2: Execute a aplicação e dê um clique longo e verifique se o menu de contexto é exibido.

7.3: Para implementar a ação de excluir uma tarefa precisamos o item selecionado. Dentro do setOnCreateContextMenuListener da lsvListarTarefas adicione:
{% highlight java %}
    AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) menuInfo;
    final Tarefa tarefaSelecionada = (Tarefa) lsvListarTarefas.getAdapter().getItem(info.position);
{% endhighlight %}

7.4: Agora, vamos implementar a ação de excluir. Dentro do setOnCreateContextMenuListener da lsvListarTarefas adicione:
{% highlight java %}
    deletar.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
        @Override
        public boolean onMenuItemClick(MenuItem item) {
            AppDatabase.getAppDatabase(ListarTarefasActivity.this).tarefaDAO().deletar(tarefaSelecionada);
            atualizarLista();
            return false;
        }
    });
{% endhighlight %}

7.5: Precisamos criar um método para atualizar a nossa ListView:
{% highlight java %}
    public void atualizarLista(){
        tarefas = AppDatabase.getAppDatabase(this).tarefaDAO().listarTodos();
        ListarTarefasAdapter adapter = new ListarTarefasAdapter(tarefas, this);
        lsvListarTarefas.setAdapter(adapter);
    }
{% endhighlight %}

7.6: Altere o método `onStart` para que o mesmo utilize o método para atualizar nossa ListView:
{% highlight java %}
    protected void onStart() {
        super.onStart();
        atualizarLista();
    }
{% endhighlight %}

7.7: O `setOnCreateContextMenuListener` do `lsvListarTarefas` vai ficar assim:
{% highlight java %}
lsvListarTarefas.setOnCreateContextMenuListener(new View.OnCreateContextMenuListener() {
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {

        MenuItem compartilhar = menu.add("Compartilhar");
        MenuItem deletar = menu.add("Deletar");

        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) menuInfo;
        final Tarefa tarefaSelecionada = (Tarefa) lsvListarTarefas.getAdapter().getItem(info.position);

        deletar.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                AppDatabase.getAppDatabase(ListarTarefasActivity.this).tarefaDAO().deletar(tarefaSelecionada);
                atualizarLista();
                return false;
            }
        });

    }});
{% endhighlight %}

7.8: Execute a aplicação e exclua alguma tarefa.

7.9: Vamos colocar uma caixa de confirmação para exclusão. Modifique o deletar.setOnMenuItemClickListener da seguinte forma:
{% highlight java %}
    deletar.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
        @Override
        public boolean onMenuItemClick(MenuItem item) {
            
            AlertDialog a = new AlertDialog.Builder(ListarTarefasActivity.this)
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .setTitle("Deletar")
                    .setMessage("Deseja realmente excluir?")
                    .setPositiveButton("Sim",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    AppDatabase.getAppDatabase(ListarTarefasActivity.this).tarefaDAO().deletar(tarefaSelecionada);
                                    atualizarLista();
                                    Snackbar.make(findViewById(R.id.layout_listar_tarefas), "Deletado com sucesso", Snackbar.LENGTH_LONG).show();
                                }
                            })
                    .setNegativeButton("Não", null)
                    .show();

            return false;
        }
    });
{% endhighlight %}
