const SimpleSchema = require("simpl-schema");

const address_schema = new SimpleSchema({
    street: String,
    number: SimpleSchema.Integer
});

const person_schema = new SimpleSchema({
    name: String,
    address: address_schema
}).newContext();

const test_object = {
    name: "Leonidas",
    address: {
        street: "Sparta",
        number: 300
    }
}

person_schema.validate(test_object);

console.log(person_schema.isValid(), person_schema.validationErrors());