/**
 * Importar el módulo 'express' para la creación de la aplicación.
 */
const express = require('express');

/**
 * Importar el enrutador de tareas.
 */
const taskRouter = require('./routes/taskRouter');

/**
 * Importar el módulo 'morgan' para visualizar las solicitudes HTTP en la terminal.
 */
const morgan = require('morgan');

/**
 * Crear una nueva instancia de la aplicación express.
 */
const app = express();

/**
 * Middleware para el manejo de datos JSON en las solicitudes HTTP.
 */
app.use(express.json());

/**
 * Configurar 'morgan' para registrar las solicitudes HTTP en la terminal con el formato 'dev'.
 */
app.use(morgan('dev'));

/**
 * Rutas para las operaciones relacionadas con las tareas.
 */
app.use('/api/v1/tasks', taskRouter);

/**
 * Definir el puerto en el que la aplicación va a escuchar las solicitudes HTTP.
 */
const PORT = process.env.PORT || 3000;

/**
 * Iniciar el servidor y hacer que escuche en el puerto definido.
 */
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: ${PORT}`);
});