# regEx - Regular Expressions

Expressões Regulares podem ser utilizadas em um Schema para definir quais **caracteres** serão **aceitos** em um campo do tipo **String**.

Podem ser declaradas de forma resumida:

```javascript
name: /^[a-zA-Z]+$/
```

Ou extensa: 

```javascript
name: {
    type: String,
    regEx: /^[a-zA-Z]+$/
}
```

## Templates

### Nome - ```/^[a-zA-Z\sà-úÀ-Ú]+$/```

Essa Expressão Regular aceita **letras**, letras com **acentos**, e **espaços** em branco. Pode ser usada em campos relacionados a nomes.

```javascript
name: {
    type: String,
    regEx: /^[a-zA-Z\sà-úÀ-Ú]+$/
}
```

### Email - ```SimpleSchema.RegEx.EmailWithTLD```

Só aceita uma **String** no formato de **email**.

```javascript
email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD
}
```

### Extra

Existem vários outros variantes de **`SimpleSchema.RegEX`** que retornam outras **Expressões Regulares**. Eles podem ser vistos **[aqui](https://www.npmjs.com/package/simpl-schema#regex)**.

### `skipRegExCheckForEmptyStrings`

Se definido como **`true`**, faz com que **`String`s vazias** sejam **igonoradas** pela Expressão Regular definida no campo.

```javascript
name: {
    type: String,
    regEx: /^[a-zA-Z\sà-úÀ-Ú]+$/,
    skipRegExCheckForEmptyStrings: true
}
```