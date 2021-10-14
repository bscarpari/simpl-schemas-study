# Validando Dados

## Modo de depuração 

Defina  `SimpleSchema.debug = true`  em seu aplicativo antes de criar qualquer contexto de validação nomeado para fazer com que todos os contextos de validação nomeados registrem automaticamente todos os erros de chave inválida no console do navegador. Isso pode ser útil durante o desenvolvimento de um aplicativo para descobrir por que certas ações estão falhando na validação. 

<br/>

## Objeto para validar 

Primeiramente passamos um **objeto normal** ou **objeto modificador mongo** ($set).

#### Exemplo ($set): 

```js
  { $set: { <field1>: <value1>, ... } 
```

<br/>

### Validando um objeto

Para validar um objeto de acordo o esquema, chame `validationContextInstance.validate (obj, options)`. Este método retorna `true` se o objeto é válido de acordo com o esquema ou `false` se não é.

Ele também armazena uma lista de campos inválidos e mensagens de erro correspondentes no objeto de contexto e faz com que os métodos reativos reajam se você injetar reatividade do Tracker.

`myContext.isValid()` para ver se o último objeto passado para `validate()` foi considerado válido, retornando `true` ou `false`
<br/><br/>


## Validando algumas chaves em um objeto

Necessidade de (re) validar certas chaves enquanto deixa quaisquer erros para outras chaves inalteradas. Por exemplo, erros em um formulário, mas você busca re (validar) apenas o campo inválido que o usuário está digitando no momento.
<br/><br/>


### Opções de Validação

`validate()` aceita as seguintes opções:

- `modifier`: validando objeto modificador mongo ($set). `false` por padrão.

- `upsert`: validando objeto modificador mongo ($set) com operadores upsert. `false` por padrão.
<br/><br/>



### Operadores upsert

- Sempre inserir a informação no banco de dados e não importa se ela já existe ou não;
- Se já existe um dado, realiza `update`, se não existe, realiza a operação de `insert`;
- Nunca retorna erro.
<br/><br/>


### Exemplo: 

- **upsert = update + insert**

```js
  //Neste caso, realiza um "update". //output: nome: "Bruno", uf: "RS",
  exemplo.updateOne({nome: "Name"}, {nome: "Bruno", uf: "RS"}, {upsert: true})
```

- `extendedCustomContext`: objeto adicionado ao contexto `this` em todas as funções de validação personalizadas que são executadas durante a validação.

- `ignore`: matriz de tipos de erros de validação a serem ignorados.

- `keys`: matriz de chaves para validar. Se não for fornecido, re(valida) todo o objeto.
<br/>

### Validando e lançando ValidationErrors 

- Chame `mySimpleSchema.validate (obj, options)` para validar `obj` de acordo com o esquema e lançar um `ValidationError` se for inválido. 

- Chame a função estática `SimpleSchema.validate (obj, schema, options)` como atalho para `mySimpleSchema.validate` se não quiser criar `mySimpleSchema` primeiro. O argumento `schema` pode ser apenas o objeto schema, caso em que será passado para o construtor `SimpleSchema` para você. É como `check (obj, schema)`, mas sem a dependência `check` e com a capacidade de passar todos os **detalhes do erro** do esquema de volta para um retorno de chamada no client-side.

- Chame `mySimpleSchema.validator ()` para obter uma **função** que chama `mySimpleSchema.validate` para qualquer objeto que seja passado a ela. Isso significa que você pode fazer `validate: mySimpleSchema.validator ()` no  pacote [mdg: validated-method] (https://github.com/meteor/validated-method). 

- Chame `mySimpleSchema.getFormValidator ()` para obter uma **função** que valida qualquer objeto que é passado a ela, retornando os erros. A função retornada é compatível com a [Especificação de Formulário Composável] (http://forms.dairystatedesigns.com/user/validation/). 
<br/>

### Personalizar o erro gerado

Usar `defineValidationErrorTransform` em algum lugar do código para personalizar ou especificar melhor

```js
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const customError = new MyCustomErrorType(error.message);
  customError.errorList = error.details;
  return customError;
});
```

Por exemplo, em uma aplicação Meteor, a fim de garantir que os detalhes do erro sejam enviados de volta ao cliente ao lançar um erro em um método de servidor, você pode convertê-lo em um `Meteor.Error`: 

```js
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});
```
<br/>

### Validação de campo personalizado

Existem três maneiras de anexar métodos de validação personalizados. 

- 1. Para adicionar uma função de validação personalizada que é chamada para **TODAS as chaves** em **TODOS os esquemas** (por exemplo, para publicar um pacote que adiciona suporte global para alguma regra adicional): 

```js
SimpleSchema.addValidator(myFunction);
```

- 2. Para adicionar uma função de validação personalizada que é chamada para **TODAS as chaves** para **UM esquema**: 

```js
import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({ ... });
schema.addValidator(myFunction);
```

- 3. Para adicionar uma função de validação personalizada que é chamada para **UMA chave** em **UM esquema**: 

```js
import SimpleSchema from "simpl-schema";

const schema = new SimpleSchema({
  someKey: {
    type: String,
    custom: myFunction,
  },
});
```

Todas as funções de validação personalizadas **funcionam da mesma maneira**. Primeiro, faça a validação personalizada necessária, use `this` para obter todas as informações que você precisa. Então, se válido, retorna `undefined`. Se inválido, retorna uma string de tipo de erro. A string do tipo de erro pode ser uma das [strings integradas] (https://www.npmjs.com/package/simpl-schema#manually-adding-a-validation-error) ou qualquer string que você quiser. 

- Se você retornar uma string embutida, é melhor usar as constantes `SimpleSchema.ErrorTypes`. 

- Se você retornar uma string personalizada, normalmente desejará [definir uma mensagem para ela] (https://www.npmjs.com/package/simpl-schema#customizing-validation-messages).

Em sua função de validação personalizada, `this` fornece as seguintes propriedades: 

- `key`: O nome da chave do esquema (por exemplo, " address.0.street ")

- `genericKey`: O nome genérico da chave do esquema (por exemplo , "address.$. street") 

- `definition`: O objeto de definição de esquema. 

- `isSet`: O objeto sendo validado tem esta chave definida? 

- `value`: o valor a ser validado. 

- `operator`: o operador Mongo para o qual estamos fazendo validação. Pode ser `null`. 

- `validationContext`: A instância atual de` ValidationContext` 

- `field()`: Use este método para obter informações sobre outros campos. Passe um nome de campo (chave de esquema não genérica) como o único argumento. O objeto de retorno terá as propriedades `isSet`,` value` e `operator` para esse campo.

- `siblingField ()`: Use este método para obter informações sobre outros campos que possuem o mesmo objeto pai. Funciona da mesma maneira que `field ()`. Isso é útil quando você usa subesquemas ou quando está lidando com matrizes de objetos. 

- `addValidationErrors (errors)`: Chame isso para adicionar erros de validação para qualquer chave. Em geral, você deve usar isso para adicionar erros para outras chaves. Para adicionar um erro à chave atual, retorne a string do tipo de erro. Se você usar isso para adicionar um erro para a chave atual, retorne `false` de sua função de validação personalizada. 

**NOTA:** validação personalizada no servidor e, em seguida, exibir erros de volta no cliente, consulte a seção [Validação personalizada assíncrona no cliente] (https://www.npmjs.com/package/simpl-schema#asynchronous-custom-validation-on-the-client).
<br/><br/>


### Validadores de documento inteiro personalizados 

Adicione um validador para **todos os esquemas**: 

```js
import SimpleSchema from "simpl-schema";

SimpleSchema.addDocValidator((obj) => {
  // Deve retornar uma matriz, potencialmente vazia, de objetos com propriedades de string `name` e` type` e propriedade opcional `value`.
  return [{ name: "firstName", type: "TOO_SILLY", value: "Reepicheep" }];
});
```

Adicione um validador para **um esquema**: 

```js
import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({ ... });
schema.addDocValidator(obj => {
  // Deve retornar uma matriz, potencialmente vazia,
  return [
    { name: 'firstName', type: 'TOO_SILLY', value: 'Reepicheep' }
  ];
});
```

Validadores de documentos inteiros têm disponível o seguinte no contexto` this`: 

- `this.ignoreTypes`: O valor da opção` ignore` que foi passada para `validate`. 

- `this.isModifier`: verdadeiro se estiver rodando em um objeto modificador MongoDB. 

- `this.isUpsert`: verdadeiro se estiver sendo executado em um objeto modificador MongoDB que é para um upsert. 

- `this.keysToValidate`: o valor da opção` keys` que foi passado para `validate`. 

- `this.mongoObject`: A instância do` MongoObject`.
 
- `this.obj`: O objeto completo. 

- `this.schema`: a instância do esquema.

- `this.validationContext`: A instância` ValidationContext`. 
<br/><br/>


### Adicionando manualmente um erro de validação 

Se você deseja exibir reativamente um erro de validação arbitrário e não é possível usar uma função de validação personalizada (talvez você tenha que chamar uma função `onSubmit` ou esperar por resultados assíncronos), você pode adicionar um ou mais erros para um contexto de validação a qualquer momento chamando `myContext.addValidationErrors (errors)`, onde `errors` é uma matriz de objetos de erro com o seguinte formato: 

```js
  {name: key, type: errorType, value: anyValue}
```

- `name`: A chave do esquema conforme especificado no esquema. 

- `type`: o tipo de erro. Qualquer string que você quiser, ou uma das strings na lista `SimpleSchema.ErrorTypes`.

- `value`: opcional. O valor que não era válido. Será usado para substituir o espaço reservado `[value]` em mensagens de erro. 

Se você usar uma string personalizada para `type`, certifique-se de definir uma mensagem para ela. Veja [Customizing Validation Messages] (https://www.npmjs.com/package/simpl-schema#customizing-validation-messages). 

Exemplo: 

```js
SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      wrongPassword: "Wrong password",
    },
  },
});

myValidationContext.addValidationErrors([
  { name: "password", type: "wrongPassword" },
]);
```
<br/>

### Validação personalizada assíncrona no cliente

NOTA: Para usar a opção `unique` neste exemplo, você precisa estar em um aplicativo Meteor com o pacote `aldeed: schema-index` adicionado. 

A validação é executada de forma síncrona por vários motivos, e provavelmente sempre será. Isso torna difícil esperar por resultados assíncronos como parte da validação customizada. Aqui está um exemplo de como você pode validar que um nome de usuário é único no cliente, sem publicar todos os nomes de usuário para cada cliente: 

```js
username: {
  type: String,
  regEx: /^[a-z0-9A-Z_]{3,15}$/,
  unique: true,
  custom() {
    if (Meteor.isClient && this.isSet) {
      Meteor.call("accountsIsUsernameAvailable", this.value, (error, result) => {
        if (!result) {
          this.validationContext.addValidationErrors([{
            name: "username",
            type: "notUnique"
          }]);
        }
      });
    }
  }
}
```

Observe que estamos chamando nosso método de servidor "accountsIsUsernameAvailable" e aguardando um resultado assíncrono, que é um booleano que indica se esse nome de usuário está disponível. Se for usado, invalidamos manualmente a chave `username` com um erro "notUnique".

Isso não muda o fato de que a validação é síncrona. Se você usar isso com um formulário automático e não houver erros de validação, o formulário ainda será enviado. No entanto, a criação do usuário falharia e um ou dois segundos depois, o formulário exibiria o erro "notUnique", portanto, o resultado final é muito semelhante à validação assíncrona real. 

Você pode usar uma técnica semelhante a esta para solucionar problemas de assincronicidade no código do cliente e do servidor. 
<br/><br/>


### Obtendo uma lista de chaves inválidas e mensagens de erro de validação 

_Este é um método reativo se você habilitou a reatividade do Tracker._

Chame `myValidationContext.validationErrors ()` para obter o conjunto completo de erros de validação. Cada objeto na matriz tem pelo menos duas chaves: 

- `nome`: a chave do esquema conforme especificado no esquema.

- `type`: o tipo de erro. Veja `SimpleSchema.ErrorTypes`. 

Também pode haver uma propriedade `value`, que é o valor inválido. 

Pode haver uma propriedade `message`, mas geralmente a mensagem de erro é construída a partir de modelos de mensagem. Você deve chamar `ctxt.keyErrorMessage (key)` para obter uma string de mensagem reativa ao invés de usar `error.message` diretamente. 
<br/><br/>


## Personalizando mensagens de validação

As mensagens de erro são gerenciadas pelo pacote [message-box] (https://github.com/aldeed/node-message-box). 

Na maioria dos casos, você provavelmente deseja definir mensagens padrão para serem usadas por todas as instâncias de `SimpleSchema`. Exemplo: 

```js
SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      too_long: "Too long!",
    },
  },
});
``` 

A sintaxe do objeto é a mesma mostrada [aqui] (https://github.com/aldeed/node-message-box#defining-messages) para` MessageBox.defaults`. 

Quando você chama `setDefaultMessages`, ele simplesmente estende [os padrões padrão] (https://github.com/aldeed/simpl-schema/blob/main/package/lib/defaultMessages.js#L18). 

**OBS.:** certifique-se de chamá-lo **antes** de criar qualquer uma de suas instâncias SimpleSchema

A instância `MessageBox` para uma instância de esquema específica é `simpleSchemaInstance.messageBox`.

Você pode chamar a função `messages` nisto para atualizar as mensagens apenas para aquele esquema. Exemplo: 

```js
simpleSchemaInstance.messageBox.messages({
  en: {
    too_long: "Too long!",
  },
});
```
<br/>

## Outros Métodos SimpleSchema

Chame `MySchema.schema ([key])` para obter o objeto de definição de esquema. Se você especificar uma chave, apenas a definição do esquema dessa chave será retornada. 

Observe que isso pode não corresponder exatamente ao que você passou para o construtor SimpleSchema. O objeto de definição de esquema é normalizado internamente e este método retorna a cópia normalizada. 
<br/><br/>


## Limpando Objetos 

Você pode chamar `simpleSchemaInstance.clean ()` ou `simpleSchemaValidationContextInstance.clean ()` para limpar o objeto que você está validando. Faça isso antes de validá-lo para evitar erros de validação evitáveis. 

A função `clean` leva o objeto a ser limpo como seu primeiro argumento e as seguintes opções opcionais como seu segundo argumento:

- `mutate`: o objeto é copiado antes de ser limpo. Se você não se importa em transformar o objeto que está limpando, pode passar `mutate: true` para obter um melhor desempenho. 

- `isModifier`: O primeiro argumento é um objeto modificador? Falso por padrão. 

- `filter`:` true` por padrão. Se `true`, remove todas as chaves não explicitamente ou implicitamente permitidas pelo esquema, o que evita que erros sejam lançados para essas chaves durante a validação. 

- `autoConvert`:` true` por padrão. Se `true`, ajuda a eliminar mensagens de validação desnecessárias convertendo automaticamente os valores sempre que possível. 

  - Valores não string são convertidos em String se o esquema espera um String 
  
  - Strings que são números são convertidos em Números se o esquema espera um Número
  
  - Strings que são "verdadeiros" ou "falsos" são convertidos em booleanos se o esquema espera um booleano.
  
  - os números são convertidos em booleanos se o esquema espera um booleano, com 0 sendo "falso" e todos os outros números sendo "verdadeiro".
  
  - não -array valores são convertidos em um array de um item se o esquema espera um Array.
  
- `removeEmptyStrings`: remove as chaves em um objeto normal ou $ set onde o valor é uma string vazia? Verdadeiro por padrão. 

- `trimStrings`: Remover todos os espaços iniciais e finais dos valores das strings? Verdadeiro por padrão. 

- `getAutoValues`: Executar funções` autoValue` e injetar valores automáticos e `defaultValue`? Verdadeiro por padrão.

- `extendAutoValueContext`: Este objeto será adicionado ao contexto `this` das funções autoValue. `extendAutoValueContext` pode ser usado para fornecer informações valiosas adicionais às funções `autoValue`, como `userId`. (Observe que as operações feitas usando o pacote Collection2 adicionam automaticamente `userId` ao contexto `autoValue`.) 

Você também pode definir padrões para qualquer uma dessas opções nas opções do construtor SimpleSchema: 

```js
const schema = new SimpleSchema(
  {
    name: String,
  },
  {
    clean: {
      trimStrings: false,
    },
  }
);
```

NOTA: O pacote Collection2 sempre chama `clean` antes de cada inserção, atualização ou upsert.

<br/>

## Datas 

Para consistência, se você se preocupa apenas com a parte da data (ano, mês, data) e não com a hora, use um objeto `Data` definido para a data desejada à meia-noite UTC _ (observe, a função de limpeza ganhou ' t retirar o tempo) _. Isso vale para datas `min` e `max` também. Se você se preocupa apenas com a parte da data e deseja especificar uma data mínima, `min` deve ser definido como meia-noite UTC na data mínima (inclusive). 

Seguir essas regras garante a máxima interoperabilidade com entradas de data HTML5 e geralmente faz sentido. 

<br/>


## Exemplos de códigos de boas práticas 

### Tornar um campo obrigatório condicionalmente 

Se você tiver um campo que deve ser obrigatório apenas em certas circunstâncias, primeiro torne o campo 
opcional e, em seguida, use uma função personalizada semelhante a esta:

```js
{
  field: {
    type: String,
    optional: true,
    custom: function () {
      let shouldBeRequired = this.field('saleType').value === 1;

      if (shouldBeRequired) {
        // inserts
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
        }

        // updates
        else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
          if (this.operator === "$unset") return SimpleSchema.ErrorTypes.REQUIRED;
          if (this.operator === "$rename") return SimpleSchema.ErrorTypes.REQUIRED;
        }
      }
    }
  }
}
```

Onde `customCondition` é o que deve ser acionado. 

### Validar uma chave em relação a outra 

Aqui está um exemplo de como declarar um valor válido ou inválido com base em outro 
valor usando uma função de validação personalizada. 

```js
SimpleSchema.messageBox.messages({
  en: {
    passwordMismatch: "Passwords do not match",
  },
});

MySchema = new SimpleSchema({
  password: {
    type: String,
    label: "Enter a password",
    min: 8,
  },
  confirmPassword: {
    type: String,
    label: "Enter the password again",
    min: 8,
    custom() {
      if (this.value !== this.field("password").value) {
        return "passwordMismatch";
      }
    },
  },
});
```

<br/>

### Tradução de mensagens de expressão regular 

As mensagens embutidas em inglês para expressões regulares usam uma função, portanto, para fornecer mensagens semelhantes em outro idioma, você também pode usar uma função com uma instrução switch: 

```js
messages: {
  fr: {
    regEx({ label, regExp }) {
                switch (regExp) {
                    case (SimpleSchema.RegEx.Email.toString()):
                    case (SimpleSchema.RegEx.EmailWithTLD.toString()):
                        return "Cette adresse e-mail est incorrecte";
                    case (SimpleSchema.RegEx.Domain.toString()):
                    case (SimpleSchema.RegEx.WeakDomain.toString()):
                        return "Ce champ doit être un domaine valide";
                    case (SimpleSchema.RegEx.IP.toString()):
                        return "Cette adresse IP est invalide";
                    case (SimpleSchema.RegEx.IPv4.toString()):
                        return "Cette adresse IPv4 est invalide";
                    case (SimpleSchema.RegEx.IPv6.toString()):
                        return "Cette adresse IPv6 est invalide";
                    case (SimpleSchema.RegEx.Url.toString()):
                        return "Cette URL est invalide";
                    case (SimpleSchema.RegEx.Id.toString()):
                        return "Cet identifiant alphanumérique est invalide";
                    case (SimpleSchema.RegEx.ZipCode.toString()):
                        return "Ce code postal est invalide";
                    case (SimpleSchema.RegEx.Phone.toString()):
                        return "Ce numéro de téléphone est invalide";
                    default:
                        return "Ce champ n'a pas passé la validation Regex";
                }
            },
    }
  }
}
```

<br/>

## Estendendo as opções de esquema

Você pode descobrir em algum ponto que há algo extra que você realmente gostaria de definir dentro de um esquema para seu pacote ou aplicativo. No entanto, se você adicionar opções não reconhecidas à definição do esquema, receberá um erro. Para informar SimpleSchema sobre sua opção personalizada e evitar o erro, você precisa chamar `SimpleSchema.extendOptions`. A título de exemplo, aqui está como o pacote Collection2 adiciona as opções de esquema adicionais que fornece: 

```js
SimpleSchema.extendOptions(["index", "unique", "denyInsert", "denyUpdate"]);
```
