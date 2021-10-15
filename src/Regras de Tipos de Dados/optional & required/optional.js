const SimpleSchema = require("simpl-schema");



/*   DECLARANDO   */

const task_schema = new SimpleSchema({
    title: String,
    author: SimpleSchema.oneOf(String, Number),
    dueDate: {
        type: Date,
        optional: true
    }
});



/*   VALIDANDO   */

const task_schema_context = task_schema.newContext();

task_schema_context.validate({
    title: "to study",
});

//Um erro será gerado pela ausência do campo author, mas não pelo campo dueDate

console.log(`----- ERROS -----`);
console.log(task_schema_context.validationErrors());