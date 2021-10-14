const SimpleSchema = require("simpl-schema");



/*   DECLARANDO   */

const person_schema = new SimpleSchema({
    name: {
        type: String,
        min: 8,
        max: 64,
        regEx: /^[a-zA-Z\sà-úÀ-Ú]+$/
    },
    otherName: String,
    address: Object,
    'address.street': {
        type: String,
        min: 10,
        max: 48
    }
},
{
    keepRawDefinition: true
}
);

const name_schema = person_schema.pick('name', 'otherName');



/*   VALIDANDO   */

const person_schema_context = person_schema.newContext();
const name_schema_context = name_schema.newContext();

let test_object = {
    name: "wasd wasd",
    otherName: "xyz",
    address: {
        street: "as"
    }
};

person_schema_context.validate(test_object);
name_schema_context.validate(test_object);

console.log("   Person Schema   \n", 
    person_schema_context.isValid(), 
    person_schema_context.validationErrors()
);
console.log("\n   Name Schema   \n", 
    name_schema_context.isValid(),
    name_schema_context.validationErrors()
);

//console.log("   Person Schema   \n", person_schema.rawDefinition);
//console.log("\n   Name Schema   \n", name_schema.rawDefinition);