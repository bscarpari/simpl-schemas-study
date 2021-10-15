const SimpleSchema = require("simpl-schema");

console.log('----- Validar um modificador MongoDB -----\n');
const validationContext = new SimpleSchema({ 
  name: String, 
}).newContext(); 

validationContext.validate ( 
  { 
    $set: { 
      name: 2, 
    }, 
  }, 
  {modifier: true} 
); 

console.log(validationContext.isValid()); 
console.log(validationContext.validationErrors()); 