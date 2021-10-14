# O que é context?

Um contexto é basicamente o **lugar** onde o simpl-schema armazena o **resultado da validação** de uma operação de validação. Portanto, se você precisa salvar as mensagens de erro de uma instância de um formulário (por exemplo, porque existem várias instâncias do mesmo formulário em uma página), você precisa criar e manter um **contexto dedicado** a cada instância. Se você não se importa em manter as mensagens de erro de uma instância de um formulário, pode reutilizar o mesmo contexto ou usar o contexto padrão.
<br/><br/>

## Maneiras de validar: 

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
<br/><br/>

## Contexto de validação nomeado:

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
<br/>

## Contexto de validação sem nome

Para obter um contexto de validação sem nome, chame `newContext ()`:

```js
import SimpleSchema from "simpl-schema";

const schema = new SimpleSchema({
  name: String,
});

const myValidationContext = schema.newContext ();
```

Contexto de validação sem nome não é persistido em qualquer lugar. Geralmente, serve para ver se um documento é válido, ou seja, não há necessidade de métodos reativos neste caso (permanecem na memória local)
<br/><br/>


## Outros métodos de contexto de validação 

`myContext.keyIsInvalid (key)` retorna verdadeiro se a chave especificada é atualmente 
inválida, ou falso se é válida. Este é um método reativo. 

`myContext.keyErrorMessage (key)` retorna a mensagem de erro para a 
chave especificada se for inválida. Se for válido, este método retorna uma string vazia. Este 
é um método reativo. 

Chame `myContext.reset ()` se você precisar redefinir o contexto de validação, limpando todas as mensagens de campo inválidas e tornando-as válidas. 

`myContext.name` é definido como o nome do contexto, se for um contexto nomeado. Crie contextos nomeados chamando `schema.namedContext (name)` ou `new ValidationContext (schema, name)`. 
