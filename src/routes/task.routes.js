const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const task = require('../models/task');

router.get('/',async(req,res) =>{
    const tasks  = await Task.find();
    console.log(tasks)
    res.json(tasks);
    // Task.find({})
    // .then(tasks => console.log(tasks))
    // .catch(err => console.error(err)); 
 
});

router.get('/:id',async (req, res) =>{
    const task = await Task.findById(req.params.id);
    res.json(task);
})
router.post('/', async(req, res) =>{
    const {title, descripcion } = req.body;
    const task = new Task({title, descripcion});
    await task.save();
    res.json({status: 'tarea guardada'});
})

router.put('/:id',async(req, res) =>{
    const {title, descripcion} = req.body;
    const newTask = {title, descripcion};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    
    res.json({status: 'tarea actualizada'});
})
router.delete('/:id',async (req, res)=>{
    await Task.findByIdAndRemove(req.params.id)
    res.json({status: 'tarea eliminada'})
})

module.exports = router;