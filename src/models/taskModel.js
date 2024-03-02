/**
 * Clase para representar una tarea.
 */
class Task {
    /**
     * Crea una nueva instancia de la clase Task.
     * @param {string} id - El ID de la tarea.
     * @param {string} name - El nombre de la tarea.
     * @param {string} description - La descripción de la tarea.
     * @param {string} createdDate - La fecha de creación de la tarea.
     * @param {string} dueDate - La fecha de vencimiento de la tarea.
     * @param {string} status - El estado actual de la tarea.
     */
    constructor(id, name, description, createdDate, dueDate, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.status = status;
    }
}

module.exports = Task;