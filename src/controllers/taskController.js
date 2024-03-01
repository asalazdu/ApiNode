const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '..', 'data', 'tasks.js');

function readTasksFromFile() {
    try {
        const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(tasksData);
    } catch (error) {
        console.error('Error al leer el archivo de tareas:', error);
        return [];
    }
}

function writeTasksToFile(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error al escribir en el archivo de tareas:', error);
    }
}

let tasks = readTasksFromFile();

module.exports = {
    getAllTasks: (req, res) => {
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Aún no tienes tareas creadas' });
        }
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
        const { name, description, dueDate, createdDate, status } = req.body;

        if (!name || !description || !dueDate || !createdDate || !status) {
            return res.status(400).json({ error: 'Faltan campos requeridos para crear la tarea' });
        }

        const id = tasks.length + 1; // Generar automáticamente el ID
        const task = { id, name, description, dueDate, createdDate, status };
        tasks.push(task);

        writeTasksToFile(tasks);

        res.status(201).json(task);
    },

    updateTask: (req, res) => {
        const taskId = req.params.id;
        const taskToUpdate = tasks.find(task => task.id === taskId);

        if (!taskToUpdate) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'El campo "status" es requerido' });
        }

        taskToUpdate.status = status;
        writeTasksToFile(tasks);

        res.json(taskToUpdate);
    },

    deleteTask: (req, res) => {
        const taskId = req.params.id;
        const initialLength = tasks.length;
        tasks = tasks.filter(task => task.id !== taskId);

        if (tasks.length === initialLength) {
            return res.status(404).json({ error: 'La tarea no fue encontrada' });
        }

        writeTasksToFile(tasks);

        res.sendStatus(204);
    }
};