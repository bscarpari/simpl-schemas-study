const SimpleSchema = require("simpl-schema");


/*   DECLARANDO   */

const name_schema = new SimpleSchema({
    firstName: {
        type: String,
        min: 4, 
        max: 8
    },
    id: {
        type: SimpleSchema.Integer,
        min: 4, 
        max: 8,
        exclusiveMin: true
    }
});

/*   VALIDANDO   */

const name_schema_context = name_schema.newContext();

name_schema_context.validate({
    firstName: "wasd",
    id: 4
});

console.log(name_schema_context.validationErrors());