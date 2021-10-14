const SimpleSchema = require("simpl-schema");


/*   DECLARANDO   */

const person_schema = new SimpleSchema({
    firstName: {
        type: String,
        min: 3,
        max: 18,
        regEx: /^[a-zA-Zà-úÀ-Ú]+$/
    },
    lastName: {
        type: String,
        min: 3,
        max: 18,
        regEx: /^[a-zA-Zà-úÀ-Ú]+$/
    }
},
{
    keepRawDefinition: true
}
);

const name_schema = person_schema.omit('firstName');




/*   VALIDANDO   */

const person_schema_context = person_schema.newContext();
const name_schema_context = name_schema.newContext();

let test_object = {
    lastName: "wasd"
};

for (schema of [person_schema_context, name_schema_context]) {
    schema.validate(test_object);
}

console.log(
    `\n   PERSON SCHEMA   \n`,
    `Is valid: ${ person_schema_context.isValid() }\n`,
    person_schema_context.validationErrors(),
    `\n\n`
);

console.log(
    `\n   NAME SCHEMA   \n`,
    `Is valid: ${ name_schema_context.isValid() }\n`,
    name_schema_context.validationErrors(),
    `\n\n`
);