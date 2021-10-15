const SimpleSchema = require("simpl-schema");

const person_schema = new SimpleSchema({
    name: String,
    address: {
        type: Object,
        blackbox: true
    },
    'address.city': String,
    'address.number': SimpleSchema.Integer
});

const person_schema_context = person_schema.newContext();

person_schema_context.validate({
    name: "Clark Kent",
    /*
    address: {
        city: 'Smallville'
    }
    */
    address: {

    } 
});

console.log(person_schema_context.validationErrors())