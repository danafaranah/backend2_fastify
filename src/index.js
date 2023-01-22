import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import Fastify from "fastify";
import { connectDb } from "./database.js";
import empleadoRoutes from "./routes/empleado.routes.js";

const fastify = Fastify({
    logger: true,
});

//Conectar con base de datos
connectDb()

//cors
fastify.register(cors, { origin: "*" });

//formbody/urlencoded
fastify.register(formBody);

//Rutas

fastify.register(empleadoRoutes, { prefix: "/empleado" })

const start = async() => {
    try {
        await fastify.listen({ port: 4000, host: "0.0.0.0" });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};

start();