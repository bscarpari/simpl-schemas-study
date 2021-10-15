const SimpleSchema = require("simpl-schema");

console.log('----- Validar uma matriz de objetos e lançar um erro -----\n');
new SimpleSchema({
    name: String,
}).validate([{ name: "Bill" }, { name: 2 }]);