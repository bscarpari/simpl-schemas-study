const SimpleSchema = require("simpl-schema");



/*   DECLARANDO   */

const person_schema = new SimpleSchema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    }
},
{
    requiredByDefault: false
}
);



/*   VALIDANDO   */

const person_schema_context = person_schema.newContext();

person_schema_context.validate({
    firstName: "a name"
});

//A ausência de lastName não vai gerar nenhum erro
console.log(`----- ERROS -----\n`, person_schema_context.validationErrors());