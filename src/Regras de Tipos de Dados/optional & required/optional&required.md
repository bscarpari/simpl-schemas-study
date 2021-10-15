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

## Observações

### Array

- Se um **campo** do tipo **`Array`** for **obrigatório**, um Array vazio (**`[]`**) será **aceito** em uma validação.

    > Caso um **`Array` vazio não** deva ser **aceito**, é possível utilizar `minCount:1`.

    ```javascript
    randomField: {
        type: Array,
        required: true,
        minCount: 1
    }
    ```

- Se o **item** de um campo do tipo **`Array`** for **opcional**, **`null`** será **aceito** em uma validação. E caso ele seja obrigatório, null não será aceito.

### Object

- Se um campo do tipo **`Object`** for **opcional**, mas uma ropriedade (**key**) sua for **obrigatória**, a ausência dessa propriedade **só** resultará em **erros** de validação, se o **Objeto** em si tiver sido **declarado**.

    > Confira o arquivo **object.js** para obter um exemplo.