# Micro E-commerce
![Header do Site](images/fotosite.png)

## Tecnologias básicas
O catálogo foi desenvolvido utilizando o tríade básica do front-end (HTML, CSS, Javascript). Foi desenvolvido para testar e aprimorar habilidades relacionadas no desenvolvimento web.

## CRUD em JSON
Create, read, update e delete de um array com objects em Json. Atualmente o projeto simula a tela de um administrador inserindo novos produtos, usuários e vendedores em um micro e-commerce.

# CRUD-PHP
## Desafio: 
Regras do desafio:
  - Menu + Tela Sobre
  - mais no mínimo 3 telas além do menu e sobre
  - no mínimo 3 tabelas
  - CRUD
  - imagens de voltar, excluir, alterar, inserir ...
  - CSS externo

Na Tela Sobre será necessário justificar: 
  - O que é?
  - Para que?
  - Por que?

## Passos iniciais
Primeiramente siga as instruções da [instalação do docker a partir da documentação oficial](https://docs.docker.com/engine/install/) e adicione o `host` `flex.localhost` dentro do arquivo `/etc/hosts`.

> [!TIP]
> Para entender a estrutura, utilize o seguinte tutorial: [Como criar containers com PHP, MySQL e NGINX utilizando o Docker Compose](https://dev.to/jrnunes1993/como-criar-containers-com-php-mysql-e-nginx-utilizando-o-docker-compose-964)

## Conteiners Docker
Esse projeto utiliza três conteiners, nos quais todos estão orquestrados dentro de `docker-compose.yml`, esses são:
  - Nginx (Servidor Web)
  - PHP/FPM (Linguagem de programação/ Servidor PHP)
  - MYSQL (Banco de Dados)


## Iniciando o Servidor
Para iniciar o servidor e rodar nossa aplicação, será necessário o `docker` e o `docker compos` instalado seguindo os `#Passos Iniciais`, quando todas as dependências necessárias estiverem adicionadas e configuradas, utilize o comando a seguir: 
```
sudo docker compose up -d --build
```

## Referências
- [jrnunes1993](https://dev.to/jrnunes1993/como-criar-containers-com-php-mysql-e-nginx-utilizando-o-docker-compose-964)
