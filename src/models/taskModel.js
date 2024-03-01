class Task{
    constructor(id, name, description, createdDate, dueDate, status){
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.status = status;
    }
}

module.exports = Task;