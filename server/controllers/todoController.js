const todoModel = require('../models/todoModel')
//create todo
module.exports.createTodo = async(req, res) => {
    try {
        const {todo} = req.body
        if(!todo){
            return res.json({message: "todo is required"})
        }
        const exisTing = await todoModel.findOne({todo})
        if(exisTing){
            return res.json({message: "todo already exist"})
        }
        //create todo
        const createTodo = await new todoModel({todo}).save()
        res.status(200).json({
            success: true,
            message: "Todo is created",
            createTodo
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, message: "Something wrong", error})
    }
}
//get toddos
module.exports.getAllTodo = async(req, res) => {
    try {
        const todos = await todoModel.find()
        res.status(200).json({
            success: true,
            message: "All todos",
            todos
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Something wrong", error})
    }
}
//get single todo
module.exports.getSingleTodo = async(req, res) => {
    try {
        const {id} = req.params
        const todo = await todoModel.findById(id)
        res.status(200).json({success: true, message: "Success", todo})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Something wrong", error})
    }
}
//update todo
module.exports.updateTodo = async(req, res) => {
    try {
        const {id} = req.params
        const {todo} = req.body
        const update = await todoModel.findByIdAndUpdate(id, {todo}, {new: true})
        res.status(200).json({
            success: true,
            message: "Updated successfully",
            update
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Something wrong", error})
    }
}
//delete todo
module.exports.deleteTodo = async(req, res) => {
    try {
        const {id} = req.params
        await todoModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Something wrong", error})
    }
}