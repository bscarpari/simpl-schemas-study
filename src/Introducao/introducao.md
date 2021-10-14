## Início rápido 

### Validar um objeto e lançar um erro 

```js 
import SimpleSchema from "simpl-schema";

new SimpleSchema({
  name: String,
}).validate({
  name: 2,
});
``` 

### Validar uma matriz de objetos e lançar um erro

Um erro é lançado para o primeiro objeto inválido encontrado. 

```js 
import SimpleSchema from "simpl-schema";

new SimpleSchema({
  name: String,
}).validate([{ name: "Bill" }, { name: 2 }]);
``` 

### Validar um argumento do método Meteor e satisfazer `audit-argument-checks` 

Para evitar erros sobre não verificar todos os argumentos quando você está usando SimpleSchema para validar argumentos do método Meteor, você deve passar `check` como uma opção ao criar sua instância SimpleSchema. 

```js 
import SimpleSchema from "simpl-schema";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

const myMethodObjArgSchema = new SimpleSchema({ name: String }, { check });

Meteor.methods({
  myMethod(obj) {
    myMethodObjArgSchema.validate(obj);
	// Agora faça outras coisas de método sabendo que obj satisfaz o esquema 
  }, 
}); 
``` 

### Validar um objeto e obter os erros

```js
import SimpleSchema from "simpl-schema";

const validationContext = new SimpleSchema({
  name: String,
}).newContext();

validationContext.validate({
  name: 2,
});

console.log(validationContext.isValid());
console.log(validationContext.validationErrors());
``` 

### Validar um modificador MongoDB

```js
import SimpleSchema de "simpl-schema"; 

const validationContext = new SimpleSchema ({ 
  nome: String, 
}). newContext (); 

validationContext.validate ( 
  { 
    $ set: { 
      name: 2, 
    }, 
  }, 
  {modifier: true} 
); 

console.log (validationContext.isValid ()); 
console.log (validationContext.validationErrors ()); 
``` 

### Habilitar reatividade do Meteor Tracker

```js
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

const validationContext = new SimpleSchema(
  {
    name: String,
  },
  { tracker: Tracker }
).newContext();

Tracker.autorun(function () {
  console.log(validationContext.isValid());
  console.log(validationContext.validationErrors());
});

validationContext.validate({
  name: 2,
});

validationContext.validate({
  name: "Joe",
});
``` 

Passar em `Tracker` faz com que as seguintes funções se tornem reativas: 

- ValidationContext#keyIsInvalid 
- ValidationContext#keyErrorMessage
- ValidationContext#isValid 
- ValidationContext#validationErrors 
- SimpleSchema#label 

### Limpe automaticamente o objeto antes de validá-lo 

PARA FAZER 

### Definir opções padrão para um esquema 

```js 
import SimpleSchema from "simpl-schema";

const mySchema = new SimpleSchema(
  {
    name: String,
  },
  {
    clean: {
      autoConvert: true,
      extendAutoValueContext: {},
      filter: false,
      getAutoValues: true,
      removeEmptyStrings: true,
      removeNullsFromArrays: false,
      trimStrings: true,
    },
    humanizeAutoLabels: false,
    requiredByDefault: true,
  }
);
``` 

Essas opções serão usadas toda vez que você limpar ou validar com esta instância SimpleSchema em particular. 

### Definir opções padrão para todos os esquemas 

```js 
import SimpleSchema from "simpl-schema";

SimpleSchema.constructorOptionDefaults({
  clean: {
    filter: false,
  },
  humanizeAutoLabels: false,
});

// Se você não passar nenhuma opção, ele retornará os padrões atuais. 
console.log(SimpleSchema.constructorOptionDefaults());
```

Essas opções serão usadas sempre que você limpar ou validar com qualquer instância SimpleSchema, mas podem ser substituídas por opções passadas para o construtor para uma única instância. 

Notas importantes: 

- Você deve chamar `SimpleSchema.constructorOptionDefaults` antes de qualquer um de seus esquemas ser criado, então coloque-o em um arquivo de ponto de entrada e / ou no topo de seu arquivo de código.

- Em um projeto grande e complexo onde instâncias SimpleSchema podem ser criadas por vários pacotes JavaScript, pode haver vários objetos `SimpleSchema`. Em outras palavras, a linha `import SimpleSchema` em um pacote pode estar puxando o objeto` SimpleSchema` de um pacote enquanto aquela linha em outro pacote puxa um objeto `SimpleSchema` completamente diferente. Será difícil saber se isso está acontecendo, a menos que você observe que seus padrões não estão sendo usados ​​por alguns de seus esquemas. Para resolver isso, você pode chamar `SimpleSchema.constructorOptionDefaults` várias vezes ou ajustar as dependências do seu pacote para garantir que apenas uma versão do` simpl-schema` seja colocada em seu projeto. 

### Limpe explicitamente um objeto 

```js 
import SimpleSchema from "simpl-schema";

const mySchema = new SimpleSchema({ name: String });
const doc = { name: 123 };
const cleanDoc = mySchema.clean(doc); 
// cleanDoc agora foi modificado para ter uma chance melhor de passar na validação 
console.log (typeof cleanDoc.name); // string 
``` 

Funciona para um modificador MongoDB também: 

```js 
import SimpleSchema from "simpl-schema";

const mySchema = new SimpleSchema({ name: String });
const modifier = { $set: { name: 123 } };
const cleanModifier = mySchema.clean(modifier);
// doc agora está alterado para ter uma chance melhor de passar na validação 
console.log(typeof cleanModifier.$set.name); // string 
`` ` 