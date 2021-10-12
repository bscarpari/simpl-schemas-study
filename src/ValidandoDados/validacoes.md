## Validando Dados

### Objeto para validar 

Primeiramente passamos um **objeto normal** ou **objeto modificador mongo** ($set).

### Exemplo ($set): 

```js
  { $set: { <field1>: <value1>, ... } 
```

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

  const userFormValidationContext = schema.namedContext("userForm");
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

**OBS.:** 
```js 
  namedContext() == namedContext('default')
```

Contexto de validação sem nome não é persistido em qualquer lugar. Geralmente, serve para ver se um documento é válido, ou seja, não há necessidade de métodos reativos neste caso (permanecem na memória local)

### Validando um objeto

Para validar um objeto de acordo o esquema, chame `validationContextInstance.validate (obj, options)`. Este método retorna `true` se o objeto é válido de acordo com o esquema ou `false` se não é.

Ele também armazena uma lista de campos inválidos e mensagens de erro correspondentes no objeto de contexto e faz com que os métodos reativos reajam se você injetar reatividade do Tracker.

`myContext.isValid()` para ver se o último objeto passado para `validate()` foi considerado válido, retornando `true` ou `false`

### Validando algumas chaves em um objeto

##### Necessidade de (re) validar certas chaves enquanto deixa quaisquer erros para outras chaves inalteradas.

Por exemplo, erros em um formulário, mas você busca re (validar) apenas o campo inválido que o usuário está digitando no momento.

### Opções de Validação

`validate()` aceita as seguintes opções:

- `modifier`: validando objeto modificador mongo ($set). `false` por padrão.

- `upsert`: validando objeto modificador mongo ($set) com operadores upsert. `false` por padrão.

#### Operadores upsert

- Sempre inserir a informação no banco de dados e não importa se ela já existe ou não;
- Se já existe um dado, realiza `update`, se não existe, realiza a operação de `insert`;
- Nunca retorna erro.

##### Exemplo: 

- **upsert = update + insert**

```js
  //Neste caso, realiza um "update". //output: nome: "Bruno", uf: "RS",
  exemplo.updateOne({nome: "Name"}, {nome: "Bruno", uf: "RS"}, {upsert: true})
```

- `extendedCustomContext`: objeto adicionado ao contexto `this` em todas as funções de validação personalizadas que são executadas durante a validação.

- `ignore`: matriz de tipos de erros de validação a serem ignorados.

- `keys`: matriz de chaves para validar. Se não for fornecido, re(valida) todo o objeto.