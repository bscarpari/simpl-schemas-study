## Validando Dados

### Objeto para validar 

Primeiramente passamos um **objeto normal** ou **objeto modificador mongo** ($set).

### Exemplo ($set): 

```js
  { $set: { <field1>: <value1>, ... } 
```

### Maneiras de validar: 
1. Com contexto descartável, lançando um erro para erros de validações:

```js
  schema.validate()
```

2. Com contexto de validação sem nome exclusivo, sem gerar erros

```js
  schema.newContext().validate()
```

3. Com contexto de validação nomeada, sem gerar erros

```js
  schema.namedContext('someUniqueString).validate()
```

4. Com contexto de validação padrão, não lançando erros

```js
  schema.namedContext().validate()
```

Um contexto de validação fornece **métodos reativos** para validar e verificar o status de validação de um objeto específico.

#### Contexto de validação nomeado:

É recomendável usar um contexto de **validação nomeado**. Assim, o contexto é persistido automaticamente por **nome**, permitindo métodos reativos.

```js
  import SimpleSchema from "simpl-schema";

  const schema = new SimpleSchema({
    name: String,
  });

  const myValidationContext = schema.newContext();
```

#### Contexto de validação sem nome

Para obter um contexto de validação sem nome, chame `newContext ()`:

```js
import SimpleSchema from "simpl-schema";

const schema = new SimpleSchema({
  name: String,
});

const myValidationContext = schema.newContext ();
```

Contexto de validação sem nome não é persistido em qualquer lugar. Serve para ver se um documento é válido, ou seja, não há necessidade de métodos reativos neste caso (permanecem na memória local)

### Validando um objeto

Para validar um objeto contra o esquema em um contexto de validação, chame `validationContextInstance.validate (obj, options)`. Este método retorna `verdadeiro` se o objeto é válido de acordo com o esquema ou `falso` se não é.

Ele também armazena uma lista de campos inválidos e mensagens de erro correspondentes no objeto de contexto e faz com que os métodos reativos reajam se você injetar reatividade do Tracker.