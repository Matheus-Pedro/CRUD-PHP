# Seeking-Knowledge

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

## Referências
  - https://dev.to/jrnunes1993/como-criar-containers-com-php-mysql-e-nginx-utilizando-o-docker-compose-964

## Passos iniciais
Primeiramente siga as instruções da [instalação do docker a partir da documentação oficial](https://docs.docker.com/engine/install/) e adicione o `host` `flex.localhost` dentro do arquivo `/etc/hosts`.

> [!TIP]
> Para realizar entender a estrutura, utilize o seguinte tutorial: [Como criar containers com PHP, MySQL e NGINX utilizando o Docker Compose](https://dev.to/jrnunes1993/como-criar-containers-com-php-mysql-e-nginx-utilizando-o-docker-compose-964)

## Conteiners Docker
Esse projeto utiliza três conteiners, nos quais todos estão orquestrados dentro de `docker-compose.yml`, esses são:
  - Nginx (Servidor Web)
  - PHP/FPM (Linguagem de programação/ Servidor PHP)
  - MYSQL (Banco de Dados)


## Iniciando o Servidor
Para iniciar o servidor e rodar nossa aplicação, será necessário o `docker` e o `docker compos` instalado seguindo os `#Passos Iniciais`, quando todas as dependências necessárias estiverem adicionadas e configuradas, utilize o comando a seguir: 
```
sudo docker compose up -d
```

## Referências
- [jrnunes1993](https://dev.to/jrnunes1993/como-criar-containers-com-php-mysql-e-nginx-utilizando-o-docker-compose-964)