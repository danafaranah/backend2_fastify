export const userValidSchema = {

    body: {
        type: "object",
        required: ["nombres", "correo", "edad", "salario", "cargo"],
        properties: {
            nombres: {
                type: "string",
            },
            apellidos: {
                type: "string",
            },
            correo: {
                type: "string",
                format: "email",
            },
            edad: {
                type: "number",
                minimum: 1,
                maximum: 100,
            },
            salario: {
                type: "number",
            },
            cargo: {
                type: "string",
            },
        },
    },
};