import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/empleados';


export const connectDb = async() => {

    //Consultar más acerca de la función de desta linea de código
    mongoose.set('strictQuery', false)

    try {
        const db = await mongoose.connect(uri);
        console.log(`Base de datos conectada ${db.connection.name}`)
    } catch (error) {
        console.log(`error al conectar a la base de datos ${error.message}`);
    }
};