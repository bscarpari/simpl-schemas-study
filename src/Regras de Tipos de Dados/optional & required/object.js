const SimpleSchema = require("simpl-schema");



/*   DECLARANDO   */

const person_schema = new SimpleSchema({
    name: String,
    address: {
        type: Object,
        optional: true
    },
    'address.city': {
        type: String
    }
});



/*   VALIDANDO   */

const person_schema_context = person_schema.newContext();

person_schema_context.validate({
    name: 'some name',
});

//Nenhum erro será gerado, pois address é opcional
console.log(`----- ERROS SEM OBJETO -----\n`, person_schema_context.validationErrors());


person_schema_context.validate({
    name: 'some name',
    address: {
        
    }
});

//Um erro será gerado, pois embora address seja opcional, 'address.city' não é
console.log(`----- ERROS COM OBJETO -----\n`, person_schema_context.validationErrors());