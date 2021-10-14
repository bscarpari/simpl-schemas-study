### O que é context?

Um contexto é basicamente o **lugar** onde o simpl-schema armazena o **resultado da validação** de uma operação de validação. Portanto, se você precisa salvar as mensagens de erro de uma instância de um formulário (por exemplo, porque existem várias instâncias do mesmo formulário em uma página), você precisa criar e manter um **contexto dedicado** a cada instância. Se você não se importa em manter as mensagens de erro de uma instância de um formulário, pode reutilizar o mesmo contexto ou usar o contexto padrão.

### Maneiras de validar: 
1. Com contexto descartável, lançando avisos para erros de validações:

```js
  schema.validate()
```

2. Com contexto de validação sem nome exclusivo, sem gerar erros

```js
  schema.newContext().validate()
```

3. Com contexto de validação nomeada, sem gerar erros

```js
  schema.namedContext('someUniqueString').validate()
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

  const userFormValidationContext = schema.namedContext("userForm");
```

**OBS.:** 
```js 
  namedContext() == namedContext('default')
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

Contexto de validação sem nome não é persistido em qualquer lugar. Geralmente, serve para ver se um documento é válido, ou seja, não há necessidade de métodos reativos neste caso (permanecem na memória local)
