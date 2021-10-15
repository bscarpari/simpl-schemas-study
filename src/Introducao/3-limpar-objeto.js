const SimpleSchema = require("simpl-schema");

const mySchema = new SimpleSchema({ name: String });
const doc = { name: 123 };
console.log (doc.name + " - " + typeof doc.name);
const cleanDoc = mySchema.clean(doc); 
console.log (cleanDoc.name + " - " + typeof cleanDoc.name);