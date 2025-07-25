# Relógio Mundial com Microserviços (Docker)

Este é um projeto de demonstração que implementa um relógio mundial utilizando uma arquitetura de microserviços com Docker e Docker Compose. Foi desenvolvido como parte de um desafio para demonstrar habilidades em conteinerização e desenvolvimento web full-stack.

## Funcionalidades

-   Exibe a hora local do usuário em tempo real.
-   Permite selecionar diferentes fusos horários a partir de uma lista.
-   Busca e exibe a hora atual para o fuso horário selecionado, consumindo uma API de backend.
-   Apresenta uma animação de carregamento elegante com um tempo de exibição mínimo para uma melhor experiência do usuário.
-   **Tratamento de erros interativo:** Em caso de falha na comunicação com a API, exibe um botão "Tentar novamente".
-   Interface estilizada e responsiva.

## Tecnologias Utilizadas

### **Frontend**
-   **HTML5**
-   **CSS3** (com animações `@keyframes`)
-   **JavaScript (ES6+)** (com `async/await` para chamadas de API)
-   **Servidor Web:** Apache HTTP Server (httpd) executado em um contêiner Docker.

### **Backend**
-   **Linguagem:** Python 3.9
-   **Framework:** Flask (para criar a API REST)
-   **Bibliotecas:**
    -   `requests`: Para consumir a API externa.
    -   `Flask-Cors`: Para permitir a comunicação entre o frontend e o backend.
-   **API Externa:** WorldTimeAPI

### **Orquestração e Conteinerização**
-   **Docker**
-   **Docker Compose**

## Arquitetura

O projeto é composto por dois serviços principais, orquestrados pelo Docker Compose:

1.  **`apache-server` (Frontend):**
    -   Um contêiner Apache que serve os arquivos estáticos (HTML, CSS, JS).
    -   O JavaScript do cliente faz uma requisição para o serviço de backend para obter a hora do fuso horário selecionado.
    -   Acessível na porta `8080` da máquina local.

2.  **`backend-api` (Backend):**
    -   Um contêiner Python/Flask que expõe uma API REST.
    -   Possui um endpoint: `/api/time/<timezone>`.
    -   Quando o endpoint é chamado, o serviço consome a API pública `WorldTimeAPI`, formata a resposta e a retorna para o frontend.
    -   Acessível na porta `5001` da máquina local.

## Como Executar o Projeto

### Pré-requisitos
-   Docker instalado.
-   Docker Compose instalado.

### Passos

1.  Clone este repositório.

2.  Navegue até a pasta raiz do projeto em seu terminal.

3.  Execute o Docker Compose para construir as imagens e iniciar os contêineres:
    ```bash
    docker-compose up --build -d
    ```
    -   O comando `--build` garante que a imagem do backend seja construída a partir do `Dockerfile`.
    -   O flag `-d` executa os contêineres em modo "detached" (em segundo plano).

4.  Abra seu navegador e acesse a aplicação:
    http://localhost:8080

Para parar a aplicação, execute o seguinte comando na pasta raiz:
```bash
docker-compose down
```

## Estrutura do Projeto

```
.
├── backend/              # Contém os arquivos do serviço de backend (API Python)
├── src/                  # Contém os arquivos do serviço de frontend (HTML/CSS/JS)
├── docker-compose.yml    # Orquestra a inicialização de todos os serviços
└── README.md             # Este arquivo
```