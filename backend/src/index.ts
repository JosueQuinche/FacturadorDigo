import app from './app';
import { AppDataSource } from './db/conexion';

async function main() {
    try {
        // Inicializar la base de datos
        await AppDataSource.initialize();
        console.log("Base de Datos Conectada");

        // Iniciar el servidor
        app.listen(3000, () => {
            console.log("Server Activo en el puerto 3000");
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

main();
