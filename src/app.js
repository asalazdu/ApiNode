
const express = require('express');


const taskRouter = require('./routes/taskRouter');


const morgan = require('morgan');


const app = express();


app.use(express.json());


app.use(morgan('dev'));


app.use('/api/v1/tasks', taskRouter);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: ${PORT}`);
});