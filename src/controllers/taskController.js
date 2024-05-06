
let tasks = [];

function generateId() {
    return Math.floor(Math.random() * 100).toString();
}


module.exports = {
    
    getAllTasks: (req, res) => {
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No hay tareas registradas en este momento' });
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

    
        const taskId = generateId();

        const newTask = { id: taskId, name, description, dueDate, createdDate, status };
        tasks.push(newTask);

        res.status(201).json(newTask);
    },


    updateTask: (req, res) => {
        const taskId = req.params.id;
        const { status } = req.body;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        const oldStatus = tasks[taskIndex].status;
        tasks[taskIndex].status = status;

        const updatedField = { field: 'status', oldValue: oldStatus, newValue: status };
        res.json({ task: tasks[taskIndex], updatedField });
    },

   
    deleteTask: (req, res) => {
        const taskId = req.params.id;
        const initialLength = tasks.length;
        tasks = tasks.filter(task => task.id !== taskId);
        if (tasks.length === initialLength) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    },


    getTasksByPage: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const tasksInPage = tasks.slice(startIndex, endIndex);
        res.json(tasksInPage);
    },

    validateTaskData: (req, res, next) => {
        const { name, description, dueDate, createdDate, status } = req.body;

        if (!name || !description || !dueDate || !createdDate || !status) {
            return res.status(400).json({ error: 'Faltan campos requeridos para crear la tarea' });
        }

        next();
    },

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