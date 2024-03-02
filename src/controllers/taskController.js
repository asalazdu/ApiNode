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

        // Validar datos de entrada
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
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        // Guardar el estado anterior para comparar después
        const oldStatus = tasks[taskIndex].status;
        tasks[taskIndex].status = status;
        // Crear un objeto con el campo actualizado y su nuevo valor
        const updatedField = { field: 'status', oldValue: oldStatus, newValue: status };
        res.json({ task: tasks[taskIndex], updatedField });
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
    },

    /**
     * Obtiene un conjunto de tareas paginadas.
     * @function getTasksByPage
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    getTasksByPage: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const tasksInPage = tasks.slice(startIndex, endIndex);
        res.json(tasksInPage);
    },

    /**
     * Valida los datos de entrada para crear una nueva tarea.
     * @function validateTaskData
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @param {Function} next - Función para pasar el control al siguiente middleware.
     * @returns {void}
     */
    validateTaskData: (req, res, next) => {
        const { name, description, dueDate, createdDate, status } = req.body;

        if (!name || !description || !dueDate || !createdDate || !status) {
            return res.status(400).json({ error: 'Faltan campos requeridos para crear la tarea' });
        }

        next();
    },

    /**
     * Filtra las tareas según los criterios especificados en la solicitud.
     * @function filterTasks
     * @memberof TaskController
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {void}
     */
    filterTasks: (req, res) => {
        const { completed, overdue } = req.query;
        let filteredTasks = tasks;
        if (completed) {
            filteredTasks = filteredTasks.filter(task => task.status === 'Completado');
        }
        if (overdue) {
            const currentDate = new Date();
            filteredTasks = filteredTasks.filter(task => new Date(task.dueDate) < currentDate);
        }
        res.json(filteredTasks);
    }
};