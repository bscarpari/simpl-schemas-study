const SimpleSchema = require("simpl-schema");

const person = new SimpleSchema({
    name: {
        type: String,
        min: 12,
        max: 24
    }
});

const student = new SimpleSchema({
    name: {
        type: String,
        min: 20
    }
}
);

console.log(student.get("name", "min"));

student.extend(person);

console.log(student.get("name", "min"));