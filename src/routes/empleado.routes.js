import empleadoCtrl from "../controllers/empleado.controller.js";
import { userValidSchema } from "../middleware/user.validation.js";
import { seedDt } from "../seed/seedDb.js";

const route = (fastify, opts, done) => {
    //Seed Poblar Base de Datos

    fastify.get("/seed", seedDt);

    fastify.get("/", empleadoCtrl.find);
    fastify.get("/:id", empleadoCtrl.findEmpleadoById);

    fastify.post(
        "/", {
            schema: userValidSchema,
        },
        empleadoCtrl.saveEmpleado
    );

    fastify.put("/:id", empleadoCtrl.updateEmpleado);
    fastify.delete("/:id", empleadoCtrl.deleteEmpleado);

    done();
};

export default route;