# Site Cardápio – Backend & Frontend em Spring Boot

Este projeto foi desenvolvido como um estudo prático de backend e frontend com Java Spring, simulando um sistema de cardápio online, com material fornecido pela desenvolvedora Fernanda Kipper, disponível em: https://youtu.be/lUVureR5GqI?si=ZgVwJs2f3t14u1Pc

A aplicação permite cadastrar, listar, atualizar e remover itens do cardápio, servindo como base para aplicações web de restaurantes, lanchonetes ou delivery.
O foco foi aprender e aplicar conceitos de:

- Spring Boot (API REST, MVC)
- Banco de Dados (PostgreSQL)
- CRUD completo (Create, Read, Update, Delete)
- Integração frontend + backend no mesmo projeto

# Tecnologias Utilizadas

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL
- HTML, CSS e Bootstrap

# Funcionalidades

- Cadastro de pratos/bebidas no cardápio
- Listagem dos itens cadastrados
- Edição dos itens
- Exclusão de registros
- Interface simples integrada ao backend

# Estrutura do Projeto

<pre markdown="1"> ```text siteCardapio/ ├── src/ │ ├── main/ │ │ ├── java/ → Código backend (Spring Boot) │ │ │ └── com/ │ │ │ └── exemplo/ │ │ │ ├── controller/ │ │ │ ├── model/ │ │ │ ├── repository/ │ │ │ └── service/ │ │ └── resources/ → Templates Thymeleaf + configs │ │ ├── templates/ │ │ └── application.properties │ └── test/ → Testes automatizados ├── pom.xml → Configuração Maven └── README.md ``` </pre>

# Execução 

1. Clone o repositório
   `
    git clone https://github.com/seu-usuario/siteCardapio.git
    cd siteCardapio
   `
2. Configure o banco de dados no arquivo application.properties (PostgreSQL)
3. Execute a aplicação com o comando:
   `
    mvn spring-boot:run
   `
4. Acesse, no navegador, a URL:
   `
    http://localhost:8080
   `
# Melhorias Futuras 
- Implementar autenticação e controle de usuários (login/admin).
- Criar integração com API de pedidos.
- Melhorar design do frontend com templates mais modernos.
