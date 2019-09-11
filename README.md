# Blog http://marcoandra.de
Este repositório contém o Jekyll, sistema gerenciador de conteúdo estático, do blog [http://marcoandra.de](http://marcoandra.de).

## Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/33fd570b-b2d8-40dc-847e-10364788cd7a/deploy-status)](https://app.netlify.com/sites/gifted-lovelace-336955/deploys)


## Pré-requisitos
É necessário ter o interpretador [ruby](https://www.ruby-lang.org/pt/) instalado em sua máquina.


## Instalação
Instale o Jekyll
```
gem install bundler jekyll
```

Clone o repositório em seu computador:
```
git clone https://github.com/marcoaugustoandrade/marcoaugustoandrade.github.io.git
```

Acesse o repositório clonado:
```
cd marcoaugustoandrade.github.io
```

Rode a Jekyll
```
bundle exec jekyll serve
```

Caso altere o arquivo assets/js/functions.js, utilize o Gulp CLI para mimificar o JavaScript.
```
sudo npm install -g gulp-cli
```

Instale as dependências:
```
npm install
```

Rodando o Gulp:
```
gulp
```

## Contribuindo
Para contribuir para esse leia o arquivo [CONTRIBUTING](CONTRIBUTING.md) para mais detalhes.


## Licença
Esse projeto está licenciado com a licença MIT, veja o arquivo [LICENSE](LICENSE) para mais detalhes.

1.14.6

## Versionamento 

### Versão 2.0

* Implementação de novo layout
* Temas light e dark
* Barra de progresso de leitura
* Política de privacidade
* Botão ir para o topo
* Licença Creative Commons para todo o conteúdo
* Comentários com Disqus
* Google Analytics
* Correção do bug na caixa de códigos
