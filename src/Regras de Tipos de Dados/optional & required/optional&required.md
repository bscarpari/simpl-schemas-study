# Optional & Required

## Optional

Se for definido como **`true`**, faz com que o **campo** em questão seja **opcional** em uma validação.

```javascript
randomField: {
        type: String,
        optional: true
}
```

## Required

Se for definido como **`true`**, faz com que o **campo** em questão seja **obrigatório** em uma validação.

**Observação:** como todos os campos de um schema são por padrão obrigatórios, ***required*** só terá efeito (e utilidade) se a opção `requiredByDefault:` tiver sido definida como `false`.

```javascript
const schema = new SimpleSchema({
    firstName: {
        type: String,
        required: true
    }
},
{
    requiredByDefault: false
}
);
```

#### `requiredByDefault: false`

Se definido como **`false`**, **`requiredByDefault`** faz com que **todos** os **campos** de um schema sejam **opcionais** em uma validação.

## Recomendações de Uso

Caso a **maioria** dos **campos** de um schema sejam **obrigatórios**, é melhor usar **`optional`**.

Agora, se a **maioria** dos **campos** de um schema forem **opcionais**, é melhor usar **`required`**.