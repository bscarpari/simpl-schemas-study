const SimpleSchema = require("simpl-schema");

const mySchema = new SimpleSchema({ name: String });
const modifier = { $set: { name: 123 } };
console.log(typeof modifier.$set.name);//number
const cleanModifier = mySchema.clean(modifier);
console.log(typeof cleanModifier.$set.name);//string