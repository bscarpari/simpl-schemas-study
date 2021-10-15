const SimpleSchema = require("simpl-schema");

const person_schema = new SimpleSchema({
    name: {
        type: String,
        regEx: /^[a-zA-Z\sà-úÀ-Ú]+$/, //Expressão Regular que aceita letras, acentos e espaços
        skipRegExCheckForEmptyStrings: true
    }
});

const person_schema_context = person_schema.newContext();

person_schema_context.validate({
    name: 'John Snow123'
});

console.log(person_schema_context.validationErrors());

person_schema_context.validate({
    name: ''
});

console.log(person_schema_context.validationErrors());