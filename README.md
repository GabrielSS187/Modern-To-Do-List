# Modern-To-Do-List
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/GabrielSS187/Modern-To-Do-List/blob/main/LICENSE) 
![mock55](https://user-images.githubusercontent.com/86306877/218285011-21bc84f5-97c1-49b0-9ea9-c65bf77ae696.png)

# Sobre o projeto

### Link: [Modern-To-Do-List](https://ng-transactions-system.vercel.app/)
### Api Doc: [Api]()

``Modern-To-Do-List`` É uma one-page full stack web moderna, acessível é responsiva para todos os tamanhos de tela.

A aplicação ``Modern-To-Do-List`` consiste em ser uma to-do list com um design moderno e atraente.
Após você realiza o cadastro e o login na página você poderá criar, apagar e atualizar o estatus
de suas to-dos. E além disso você poderá arrasta e soltar suas to-dos para qualquer posição da sua lista para que 
você possa ter mais controle sobre elas. Todo isso com uma interface de usuário fluida, interativa
e animada para dar mais vida ao site.

## Layout Desktop. Com demostração
https://user-images.githubusercontent.com/86306877/218286294-f77a47a8-04bf-43e3-81bc-979f445d3647.mp4

## Layout Mobile e Tablet. Com demostração
https://user-images.githubusercontent.com/86306877/218286303-a38f1ab3-e1a1-41b6-aadd-03aed599b9f0.mp4

## Métricas lighthouse
![Captura de Tela (318)](https://user-images.githubusercontent.com/86306877/218285889-676c2153-61f2-40ea-91f7-58617d3d702a.png)

# Modelagem Conceitual de Dados
![Captura de Tela (316)](https://user-images.githubusercontent.com/86306877/218285587-65f2abbd-9e8f-42cc-bb29-d866cd2123f8.png)

## Competências
- Semântica
- Responsividade
- Acessibilidade
- Drag and Drop / Arrastar e soltar elementos
- Boas Práticas
- Princípios S.O.L.I.D
- Design Patterns
- Clean Code
- Deploy na nuvem
- Gerenciamentos de estados e cache

# Tecnologias utilizadas

## Conteiner
- Docker

## Banco de dados
- Postgres Sql

## Deploy na nuvem
- Aplicação web : Vercel
- Back end : Render
- Banco de dados : Railway / AWS

## Front end
- HTML / CSS / JS / TypeScript
- React JS/TS
- Vite.js
- React-query
- Tailwind Css
- Axios
- Swiper
- React-DnD
- React-dnd-html5-backend
- React-dnd-touch-backend
- React-hook-form
- React-Modal
- React-text-mask
- React-toastify
- React-device-detect
- React-awesome-reveal
- Immutability-helper
- Tailwind-scrollbar

## Back end
- Node Js
- TypeScript
- Cors
- Express Js
- Knex Js
- Tsup
- Tsx
- Jsonwebtoken
- Zod
- Bcryptjs
- pg


# Como executar o projeto na sua máquina

### 1 - Container com ( Docker )
#### Pré-requisitos: Docker instalado na sua máquina
```bash
# 1 - clonar repositório
git clone https://github.com/GabrielSS187/Modern-To-Do-List.git

# 2 - entrar na pasta
cd Modern-To-Do-List.

# 3 - rodar o docker
docker-compose up --build
```
### Caso tudo de certo o projeto deverá esta rodando no endereço: http://localhost:5173/

### 2 - Localmente
#### Pré-requisitos: npm / yarn, postgresSql
#### É preencher as variáveis de ambiente das pastas back-end é front-end

```bash
# 1 - clonar repositório
git clone https://github.com/GabrielSS187/Modern-To-Do-List.git

# 2 - Back-end ============================================================================================================
# 1 - entrar na pasta Modern-To-Do-List e depois back-end
cd Modern-To-Do-List/back-end

# 2 - instalar as dependências
npm install

# 3 - Gerar as migrações para o banco de dados
npm run migrate:latest

# 4 - executar o projeto e depois espere o servidor aparecer a messagem: "Server is running in http://localhost:8000"
npm run dev
# ===========================================================================================================================

# 5 - voltar para a pasta pai que é Modern-To-Do-List
cd ..

# 6 - Front-end ============================================================================================================
# 1 -Entrar na pasta front-end
cd front-end

# 2 - instalar as dependências
npm install

# 3 - executar o projeto
npm run dev
# ===========================================================================================================================
```
### Caso tudo de certo o projeto deverá esta rodando no endereço: http://localhost:5173/

# Autor

Gabriel Silva Souza

https://www.linkedin.com/in/gabriel-silva-souza-developer

