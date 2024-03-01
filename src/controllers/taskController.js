const Task = require('../models/taskModel');

let tasks = [];

module.exports = {
    getAllTasks: (req, res) => {
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Aún no tienes tareas creadas' });
        }
        console.log('Tareas actuales:', tasks);
        res.json(tasks);
    },

    getTaskById: (req, res) => {
        const taskId = req.params.id;
        const task = tasks.find(task => task.id === taskId);

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    },

    createTask: (req, res) => {
        const { name, description, dueDate } = req.body;
        const id = tasks.length + 1;
        const createdDate = new Date();
        const status = 'pendiente';

        const newTask = new Task(id, name, description, createdDate, dueDate, status);
        tasks.push(newTask);

        res.status(201).json(newTask);
    },

    updateTask: (req, res) => {
        const taskId = req.params.id;
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const { name, description, dueDate, status } = req.body;

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            name: name || tasks[taskIndex].name,
            description: description || tasks[taskIndex].description,
            dueDate: dueDate || tasks[taskIndex].dueDate,
            status: status || tasks[taskIndex].status
        };

        res.json(tasks[taskIndex]);
    },

    deleteTask: (req, res) => {
        const taskId = req.params.id;
        console.log('Eliminando tarea con ID:', taskId);
        const initialLength = tasks.length;
        tasks = tasks.filter(task => task.id !== String(taskId)); // Convertir taskId a cadena

        // Verificar si la tarea fue eliminada
        if (tasks.length === initialLength) {
            // Si la longitud del arreglo no cambió, significa que la tarea no se encontró
            return res.status(404).json({ error: 'La tarea no fue encontrada' });
        }

        res.sendStatus(204); // Tarea eliminada exitosamente
    }
};
