# Schemas Curtos VS Longos

## Schemas Curtos

São mais **práticos**, porém mais **limitados** também

Exemplo:

```javascript
const shorthand_schema = new SimpleSchema({
    name: String,
    registered: Boolean
});
```

## Schemas Longos

São mais **complexos**, e assim permitem **validações melhores**, mais completas

Exemplo:

```javascript
const longhand_schema = new SimpleSchema({
    name: {
        type: String,
        min: 16,
        max: 64
    },
    registered: {
        type: Boolean,
        optional: true,
    }
});
```

## Mix

Também é possível **misturar** schemas **curtos** com **longos**

Exemplo:

```javascript
const mixed_schema = new SimpleSchema({
    name: String,
    registered: {
        type: Boolean,
        optional: true
    }
});
```