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

## Funções

Em caso de validações mais complexas, também é possível usar uma função para retornar um Array de Expressões Regulares. Importante notar que, neste caso, elas seriam executadas em ordem, e seriam independentes entre si.

O que **não fazer**:

```javascript
other: {
    type: String,
    regEx: () => [/^[a-zA-Z]+$/, /[0-9]/]
}
```

O exemplo acima inutilizaria a validação, pois qualquer String que fosse aceita em uma das Expressões Regulares, seria negada na outra.

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