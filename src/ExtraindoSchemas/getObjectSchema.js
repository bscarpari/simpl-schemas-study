const SimpleSchema = require("simpl-schema");



/*   DECLARANDO   */

const person_schema = new SimpleSchema({
    name: String,
    address: Object,
    'address.city': String
});

const address_schema = person_schema.getObjectSchema('address');
//const address_schema = person_schema.pick('address');



/*   VALIDANDO   */

const person_schema_context = person_schema.newContext();
const address_schema_context = address_schema.newContext();

let test_object = {
    name: 'Bruce Wayne',
    address: {
        city: "Gotham"
    }
};

let getObjectSchema_test_object = {
    city: "Gotham"
};

let pick_test_object = {
    address: {
        city: "Gotham"
    }
};

person_schema_context.validate(test_object);
address_schema_context.validate(getObjectSchema_test_object);

console.log(
    '\n----- Person Schema -----\n',
    `Valid: ${ person_schema_context.isValid() }\n`,
    person_schema_context.validationErrors(),
    '\n'
);
console.log(
    '\n----- Address Schema -----\n',
    `Valid: ${ address_schema_context.isValid() }\n`,
    address_schema_context.validationErrors(),
    '\n'
);