# Extendendo Schemas

Ao extender um schema, o schema **"extensor"** recebe todos os campos do schema **"extendido"**. Isso pode ser muito útil quando se lida com **campos repetidos** entre **vários schemas**.

```javascript
const person = new SimpleSchema({
    name: String
});

const student = new SimpleSchema({
    student_id: SimpleSchema.Integer
});

student.extend(person);

/* student vai ficar assim
{
    name: String,
    student_id: SimpleSchema.Integer
}
*/
```

## Overriding

Se o **"extensor"** tiver um mesmo campo que o **"extendido"**, as informações sobre aquele campo seram sobrepostas pelas informações do **"extendido"**.

```javascript
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
});

student.extend(person);

/* student vai ficar assim
    name: {
        type: String,
        min: 12, //min: 20 foi sobreposto
        max: 24
    }
*/
```