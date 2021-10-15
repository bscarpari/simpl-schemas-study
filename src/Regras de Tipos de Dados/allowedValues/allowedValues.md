# allowedValues

**`Array`** de **valores** que serão **aceitos** em uma validação. Qualquer **valor** que seja **diferente** do que foi declarado nessa lista resultará em um **erro** de validação.

```javascript
const foreigner_schema = new SimpleSchema({
    country: {
        type: String,
        allowedValues: ['USA', 'BR']
    }
});
```

### `schema.getAllowedValuesForKey(key)`

Retorna um **`Array`** com os valores definidos em **`allowedValues`**

```javascript
console.log(foreigner_schema.getAllowedValuesForKey('country'));
/*
    [ 'USA', 'BR' ]
*/
```