# Label

Trata-se de uma **String** utilizada como **nome** do campo em **mensagens** de **erro** de validação.

**Declaração:**

```javascript
const person_schema = new SimpleSchema({
    userName: {
        type: String,
        min: 8,
        label: "Enter your username, please"
    }
});
```

### `schema.labels`

Permite **editar** a **label** de um schema, após ele ter sido declarado.

```javascript
person_schema.labels({
    userName: "Please, enter your userName"
});
```

### `schema.label(fieldName)`

Retorna a **label** do campo **selecionado**.

```javascript
console.log(person_schema.label('userName'));
/*
Please, enter your userName
*/
```