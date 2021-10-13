# Subschemas

Quando se está lidando com um **schema** complexo e **extenso**, é possível **fragmentá-lo** em schemas **menores**, assim criando **subschemas**.

```javascript
const address_schema = new SimpleSchema({
    street: String,
    number: SimpleSchema.Integer
});

const job_schema = new SimpleSchema({
    title: String,
    wage: Number
});

const person_schema = new SimpleSchema({
    name: String,
    job: job_schema,
    address: address_schema
});
```

## Declarando um schema dentro de outro

Embora **não** seja **recomendado**, é possível declarar um **schema** **dentro** de outro **schema**, ou pelo menos um campo do tipo Objeto.

### O que não fazer :x:


```javascript
const person_schema = new SimpleSchema({
    name: String,
    job: {
        type: Object,
        title: String,
        wage: Number
    }
});
```

### <span style="color:green">Método Correto</span>

```javascript
const person_schema = new SimpleSchema({
    name: String,
    job: Object,
    'job.title': String,
    'job.wage': Number
});
```
