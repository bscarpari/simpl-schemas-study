const SimpleSchema = require("simpl-schema");

const foreigner_schema = new SimpleSchema({
    country: {
        type: String,
        allowedValues: ['USA', 'BR']
    }, 
    grade: {
        type: SimpleSchema.Integer,
        allowedValues: [8, 9, 10]
    }
});

const foreigner_schema_context = foreigner_schema.newContext();

let foreigners = [
    {
        country: "USA",
        grade: 9
    },
    {
        country: "wasd",
        grade: 8
    },
    {
        country: "BR",
        grade: 3
    }
];

foreigners.forEach(
    foreigner => {
        foreigner_schema_context.validate(foreigner);
        console.log(foreigner_schema_context.validationErrors());
    }
);

console.log('\nVALORES ACEITOS\n', foreigner_schema.getAllowedValuesForKey('country'));