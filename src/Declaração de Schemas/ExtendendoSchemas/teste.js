const SimpleSchema = require("simpl-schema");

const person_schema = new SimpleSchema({
    id: {
        type: SimpleSchema.oneOf(
            SimpleSchema.Integer,
            String
        ),
    },
    name: {
        type: String,
        regEx: /^[a-zA-Z\sà-úÀ-Ú]+$/,
        min: 20 //Expressão Regular que aceita letras, acentos e espaços
    },

    /*
        other: { type: String, regEx: () => [/^[a-zA-Z]+$/, /[0-9]/] }
    */

    email: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD
    }
});

const student_schema = new SimpleSchema({
    name: {
        type: String,
        min: 6
    },
    grade: SimpleSchema.oneOf(
        {
            type: SimpleSchema.Integer,
            min: 0,
            max: 10
        },
        {
            type: String,
            allowedValues: ["A", "B", "C", "D", "E", "F"]
        }
    )
});

const test_object = {
    id: "identificação",
    name: "João Vitor", 
    email: "name@email.com",
    grade: "F"
};


/*   Validando   */

const context = student_schema.newContext();

context.validate(test_object);
console.log(context.isValid(), context.validationErrors());

student_schema.extend(person_schema);

context.validate(test_object);
console.log(context.isValid(), context.validationErrors());