# Extraindo Schemas

Caso apenas algumas **partes** de um schema sejam **necessárias**, elas podem ser **extraídas** do mesmo, assim criando um **novo** **schema** que possui apenas os campos necessários.

## Pick

Cria um novo schema, **adicionando** apenas os **campos selecionados**.

```javascript
const person_schema = new SimpleSchema({
    firstName: String,
    lastName: String
});

const name_schema = person_schema.pick('firstName');

/*
name_schema {
    firstName: String
}
*/
```

## Omit 

Cria um novo schema, **removendo** apenas os **campos selecionados**.

```javascript
const person_schema = new SimpleSchema({
    firstName: String,
    lastName: String
});

const name_schema = person_schema.omit('lastName');

/*
name_schema {
    firstName: String
}
*/
```