const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

//POST /create: Endpoint para crear una tarea.
router. post('/create', async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'There was a problem trying to create a task'})
    }
})

//GET /: Endpoint para traer todas las tareas.
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error gettings taks'})
    }
})

//GET /id/:_id: Endpoint para buscar tarea por id.
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id)
        if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error getting task'})
    }
})

//PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, {completed: true}, {new: true})
        if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error marking task'})
    }
})

//PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, {title: req.body.title}, {new: true})
        if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error updating title'})
    }
})

//DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id)
        if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json({message: 'Task deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error deleting task'})
    }
})

module.exports = router