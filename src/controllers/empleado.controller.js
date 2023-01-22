import { response } from "../helpers/response.js";
import { empleadoModel } from "../models/empleado.model.js";

const empleadoCtrl = {};

//Listar a todos los empleados

empleadoCtrl.find = async(req, reply) => {
    try {
        // const empleados = await empleadoModel.find();
        // response(reply, 200, true, empleados, "Lista de empleados");

        // const limit = parseInt(req.query.limit) || 10
        // const page = parseInt(req.query.page) | 1

        const options = {
            limit: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) | 1

        }

        const empleados = await empleadoModel.paginate({}, options)

        response(reply, 200, true, empleados, "Lista de Empleados");

    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

// Listar empleado por id

empleadoCtrl.findEmpleadoById = async(req, reply) => {
    try {
        const { id } = req.params;

        const empleado = await empleadoModel.findById(id);

        if (!empleado) {
            return response(reply, 404, false, "", "Registro no encontrado");
        }
        response(reply, 200, true, empleado, "Registro Encontrado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

empleadoCtrl.saveEmpleado = async(req, reply) => {
    try {
        const { correo } = req.body;

        const empleado = await empleadoModel.findOne({ correo });

        if (empleado) {
            return response(
                reply,
                400,
                false,
                "",
                `El correo ${correo} ya existe en otro registro`
            );
        }
        const newEmpleado = await empleadoModel.create(req.body);

        // const newEmpleado = empleadoModel({
        //     nombreply,
        //     apellidos,
        //     correo,
        //     edad,
        //     salario,
        //     cargo,
        // });

        // await newEmpleado.save();

        response(reply, 201, true, newEmpleado, "Registro Creado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

// Actualizar Empleado
empleadoCtrl.updateEmpleado = async(req, reply) => {
    try {
        const { id } = req.params;
        const { correo } = req.body;
        // await empleadoModel.findByIdAndUpdate({ _id: id }, req.body);
        const empleado = await empleadoModel.findById(id);
        if (!empleado) {
            return response(reply, 404, "", false, "Registro no encontrado");
        }
        if (empleado.correo !== correo) {
            const empleadoCorreo = await empleadoModel.findOne({ correo });
            if (empleadoCorreo) {
                return response(
                    reply,
                    400,
                    "",
                    false,
                    `El correo ${correo} ya existe en otro registro`
                );
            }

            await empleado.updateOne(req.body);
        }
        response(reply, 200, true, "", "Registro Actualizado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

// Eliminar un empleado

empleadoCtrl.deleteEmpleado = async(req, reply) => {
    try {
        const { id } = req.params;

        const empleado = await empleadoModel.findById(id);

        if (!empleado) {
            response(reply, 404, false, "", "Registro no encontrado");
        }

        await empleado.deleteOne();
        response(reply, 200, true, "", "Registro Eliminado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

export default empleadoCtrl;