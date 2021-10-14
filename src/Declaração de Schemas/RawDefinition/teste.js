const SimpleSchema = require("simpl-schema");

const user_schema = new SimpleSchema({
    name: String,
    id: SimpleSchema.Integer
},
{
    keepRawDefinition: true
}
);

console.log(user_schema.rawDefinition);