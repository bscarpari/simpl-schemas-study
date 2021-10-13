const SimpleSchema = require("simpl-schema");

const address_schema = new SimpleSchema({
    street: String,
    number: SimpleSchema.Integer
});
/*
const job_schema = new SimpleSchema({
    title: String,
    wage: Number
});
*/
let person_schema = new SimpleSchema({
    name: String,
    address: address_schema,
    job: {
        type: Object,
    },
    'job.title': String,
    'job.wage': Number
});

person_schema = person_schema.newContext();

person_schema.validate({
    job: {
        title: "job",
        wage: 12345.6789
    },
    address: {
        street: "street",
        number: 123
    },
    name: "name",
});

console.log(person_schema.isValid());
console.log(person_schema.validationErrors());