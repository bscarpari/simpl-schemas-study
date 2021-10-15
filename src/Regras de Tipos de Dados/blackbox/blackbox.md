# blackbox

Se definido como **`true`**, faz com que **todas** as **propriedades** de um campo do tipo **`Object`** sejam **opcionais** em uma validação.

```javascript
{
    name: String,
    address: {
        type: Object,
        blackbox: true
    },
    'address.city': String, //Será opcional
    'address.number': SimpleSchema.Integer //Será opcional
}
```