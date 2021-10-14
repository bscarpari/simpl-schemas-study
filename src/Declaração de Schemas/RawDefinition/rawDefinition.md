# Raw Definition

Retorna o **esqueleto** do **schema**. A opção ***keepRawDefinition*** deve ser marcada como **true** para que funcione (*veja linha 6*).

```javascript
const user_schema = new SimpleSchema({
    name: String,
    id: SimpleSchema.Integer
},
{
    keepRawDefinition: true
}
);

console.log(user_schema.rawDefinition);
/*
{
    name: [Function: String],
    id: 'SimpleSchema.Integer'
}
*/
```