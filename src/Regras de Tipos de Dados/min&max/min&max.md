## Min & Max

Definem o valor mínimo ou máximo a ser aceito em campos do tipo:

- **`String`**: definem o tamanho (**length**) da String;
- **`Number`** ou **`SimpleSchema.Integer`**: definem o menor ou maior número a ser aceito;
- **`Date`**: definem a data mais antiga ou mais nova a ser aceita.

## exclusiveMin & exclusiveMax

Se definidos como `true`, os valores dados como parâmetro em **min** e **max** não seram considerados em uma validação.

**Exemplo:**

```javascript
randomField: {
    type: SimpleSchema.Integer,
    min: 5,
    max: 10
}
/*
Numeros Aceitos: 5, 6, 7, 8, 9, 10
*/
```

```javascript
randomField: {
    type: SimpleSchema.Integer,
    min: 5, 
    max: 10,
    exclusiveMin: true,
    exclusiveMax: true
}
/*
Numeros Aceitos: 6, 7, 8, 9
*/
```

## minCount & maxCount

Definem o **tamanho** mínimo ou máximo de um campo do tipo **`Array`**.

```javascript
taskList: {
    type: Array,
    minCount: 1, //Um Array vazio [] não será aceito
    maxCount: 6 //Não serão aceitos 7 itens ou mais
}
```