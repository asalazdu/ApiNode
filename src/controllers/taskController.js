/**
 * @fileoverview Controlador para la gestión de tareas.
 * @module TaskController
 */

// Array para almacenar las tareas
let tasks = [];

/**
 * Función para generar un ID de forma aleatoria de máximo 3 dígitos.
 * @function generateId
 * @returns {string} - ID generado.
 */
function generateId() {
    return Math.floor(Math.random() * 100).toString();
}

/**
 * Controlador para manejar las operaciones relacionadas con las tareas.
 * @namespace TaskController
 */
module.exports = {
    /**
     * Obtiene todas las tareas.
     * @function getAllTasks
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    getAllTasks: (req, res) => {
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No hay tareas registradas en este momento' });
        }
        res.json(tasks);
    },

    /**
     * Obtiene una tarea por su ID.
     * @function getTaskById
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    getTaskById: (req, res) => {
        const taskId = req.params.id;
        const task = tasks.find(task => task.id === taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    },

    /**
     * Crea una nueva tarea.
     * @function createTask
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    createTask: (req, res) => {
        const { name, description, dueDate, createdDate, status } = req.body;

        if (!name || !description || !dueDate || !createdDate || !status) {
            return res.status(400).json({ error: 'Faltan campos requeridos para crear la tarea' });
        }

        // Generar un nuevo ID personalizado
        const taskId = generateId();

        // Agregar la nueva tarea al array
        const newTask = { id: taskId, name, description, dueDate, createdDate, status };
        tasks.push(newTask);

        res.status(201).json(newTask);
    },

    /**
     * Actualiza el estado de una tarea por su ID.
     * @function updateTask
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    updateTask: (req, res) => {
        const taskId = req.params.id;
        const { status } = req.body;
        const task = tasks.find(task => task.id === taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        task.status = status;
        res.json(task);
    },

    /**
     * Elimina una tarea por su ID.
     * @function deleteTask
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    deleteTask: (req, res) => {
        const taskId = req.params.id;
        const initialLength = tasks.length;
        tasks = tasks.filter(task => task.id !== taskId);
        if (tasks.length === initialLength) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    }
};