const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/page', taskController.getTasksByPage); 
router.get('/filter', taskController.filterTasks); 
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.validateTaskData, taskController.createTask); 
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;