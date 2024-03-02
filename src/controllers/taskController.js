const { getFirestore, collection, getDocs, addDoc, doc, setDoc, deleteDoc, getDoc } = require('firebase/firestore');
const firebaseApp = require('../data/tasks');
const { v4: uuidv4 } = require('uuid');

const db = getFirestore();

// Función para generar un nuevo ID personalizado
function generateId() {
    // Genera un ID aleatorio de 3 dígitos
    return Math.floor(Math.random() * 1000).toString();
}

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            // Obtener todas las tareas desde Firestore
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            if (tasks.length === 0) {
                return res.status(200).json({ message: 'No hay tareas registradas en este momento' });
            }
            res.json(tasks);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getTaskById: async (req, res) => {
        const taskId = req.params.id;
        try {
            // Obtener una tarea por su ID desde Firestore
            const taskDoc = await getDoc(doc(db, 'tasks', taskId));
            if (!taskDoc.exists()) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            res.json({ id: taskDoc.id, ...taskDoc.data() });
        } catch (error) {
            console.error('Error al obtener la tarea por ID:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    createTask: async (req, res) => {
        const { name, description, dueDate, createdDate, status } = req.body;

        if (!name || !description || !dueDate || !createdDate || !status) {
            return res.status(400).json({ error: 'Faltan campos requeridos para crear la tarea' });
        }

        try {
            // Generar un nuevo ID personalizado
            const taskId = generateId();
            // Agregar una nueva tarea a Firestore con el ID personalizado
            await setDoc(doc(db, 'tasks', taskId), {
                name,
                description,
                dueDate,
                createdDate,
                status
            });
            res.status(201).json({ id: taskId, name, description, dueDate, createdDate, status, message: 'Tarea creada exitosamente' });
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    updateTask: async (req, res) => {
        const taskId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'El campo "status" es requerido' });
        }

        try {
            // Actualizar el estado de la tarea en Firestore
            await setDoc(doc(db, 'tasks', taskId), { status }, { merge: true });
            res.status(200).json({ message: 'Tarea actualizada exitosamente' });
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteTask: async (req, res) => {
        const taskId = req.params.id;
        try {
            // Eliminar la tarea de Firestore por su ID
            await deleteDoc(doc(db, 'tasks', taskId));
            res.status(200).json({ message: 'Tarea eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};