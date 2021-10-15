const SimpleSchema = require("simpl-schema");

const address_schema = new SimpleSchema({
    street: String,
    number: SimpleSchema.Integer
});

const person_schema = new SimpleSchema({
    _id: {
        type: SimpleSchema.oneOf({
                type: String,
                min: 5
            }, 
            {
                type: SimpleSchema.Integer,
                max: 150
            }
        ),
    },
    address: SimpleSchema.oneOf(String, address_schema)
}).newContext();

const test_objects = [
    {
        _id: 'wasd',
        address: {
            street: "Sparta",
            number: 300
        }
    },
    {
        _id: 123,
        address: 'Sparta, 300'
    }
];

for (i in test_objects) {
    person_schema.validate(test_objects[i]);
    console.log(`\n----- OBJETO ${i} -----\n`, person_schema.isValid(), person_schema.validationErrors());
}