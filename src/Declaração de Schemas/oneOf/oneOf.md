# `SimpleSchema.oneOf()`

Permite que um campo tenho várias formas diferentes de ser aceito.

```javascript
{
    _id: SimpleSchema.oneOf(String, SimpleSchema.Integer, Date)
}
```

## Declaração

Pode ser tanto **curta**:

```javascript
{
    _id: SimpleSchema.oneOf(String, SimpleSchema.Integer)
}
```

Quanto **longa**:

```javascript
{
    id: {
        type: SimpleSchema.oneOf({
                type: String,
                min: 5
            }, 
            {
                type: SimpleSchema.Integer,
                max: 150
            }
        )
    }
}
```

## Objetos

Caso um dos parâmetros seja do tipo **`Object`**, ele deve ser declarado por fora do schema e então incluido.

### :heavy_check_mark: Método Correto :heavy_check_mark:

```javascript
const address_schema = new SimpleSchema({
    street: String,
    number: SimpleSchema.Integer
});

const person_schema = new SimpleSchema({
    address: SimpleSchema.oneOf(String, address_schema)
});
```

### :x: Método Errado :x:

```javascript

const person_schema = new SimpleSchema({
    address: SimpleSchema.oneOf(String, Object),
    'address.street': String,
    'address.number': SimpleSchema.Integer
});
```