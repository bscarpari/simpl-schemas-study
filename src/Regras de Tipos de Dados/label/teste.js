const SimpleSchema = require("simpl-schema");

const person_schema = new SimpleSchema({
    userName: {
        type: String,
        min: 8,
        label: "Enter your username, please"
    }
});

console.log(`----- ANTES -----\n${ person_schema.label('userName') }\n\n`);

person_schema.labels({
    userName: "Please, enter your userName"
});

console.log(`----- DEPOIS -----\n${ person_schema.label('userName') }\n\n`);