const SimpleSchema = require("simpl-schema");

const shortand_schema = new SimpleSchema({
    id: String,
    name: String,
    level: SimpleSchema.Integer,
    birthdate: Date,
    verified: Boolean,
    friends: [SimpleSchema.oneOf(String, SimpleSchema.Integer)]
});

const longhand_schema = new SimpleSchema({
    id: {
        type: SimpleSchema.oneOf( //Id pode ser tanto do tipo String quanto "Integer"
            {
                type: String,
                min: 12,
                max: 96
            },
            {
                type: SimpleSchema.Integer,
            }
        ),
    },
    name: {
        type: String,
        min: 8,
        max: 64
    },
    level: {
        type: SimpleSchema.Integer,
        min: 0,
        max: 100
    },
    birthdate: {
        type: Date,
        min: () => {
            return new Date('1920-01-01T00:00:00');
        },
        optional: true
    },
    verified: {
        type: Boolean,
        optional: true,
        defaultValue: false
    },
    contacts: {
        type: Array,
        minCount: 0,
        maxCount: 100,
        defaultValue: []
    },
    'contacts.$': { //Item do Array
        type: SimpleSchema.oneOf( //Id pode ser tanto do tipo String quanto "Integer"
        {
            type: String,
            min: 12,
            max: 96
        },
        {
            type: SimpleSchema.Integer,
        }
    )
    }
});

let test_object = {
    id: 12,
    name: 'name',
    level: -1,
    birthdate: new Date(),
};

//Testando a validação dos schemas

const contextShorthand_schema = shortand_schema.newContext();
const contextLonghand_schema = longhand_schema.newContext();

contextShorthand_schema.validate(test_object);
contextLonghand_schema.validate(test_object);

console.log('----- Shorthand Schema Errors -----\n');
contextShorthand_schema.validationErrors().forEach(
    error => console.log(error)    
);

console.log('\n\n----- Longhand Schema Errors -----\n');
contextLonghand_schema.validationErrors().forEach(
    error => console.log(error)    
);