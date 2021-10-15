# Estudando simpl-schemas

## 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo.

### Instale o MongoDB

** https://docs.mongodb.com/manual/tutorial/ **

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Clone o repositório com:

```
git clone https://github.com/bscarpari/simpl-schemas-study.git
```

## Testes unitários

### 1. Instale as dependências:

```
npm install
``` 

### 2. Use o `require` sempre na 1a linha dos testes:

- **OBS.: ** somente testes com apenas simpl-schema. Testes com meteor é necessário instalar as dependências restantes.

```
  const SimpleSchema = require("simpl-schema") //nome da instância de acordo com a sua preferência 
```

Com a extensão **Code Runner** em mãos (Disponível no VSCODE)

### 3. Execute os testes através de :

`CTRL + ALT + N` ou `F1 + run code` para iniciar

`CTRL + ALT + M` ou `F1 + stop` para iniciar

## 🛠️ Stack

* Simpl-schema: um pacote NPM que valida a entrada de dados de acordo com um esquema (usado em aplicações Meteor e NodeJS)
* MeteorJS: framework JavaScript para construções de aplicações fullstack.
* MongoDB: banco de dados NoSQL orientado a documentos.

---
⌨️ [Bruno Scarpari](https://github.com/bscarpari/)<br/>⌨️ [Kainã Mazim](https://github.com/KaMazim) 
