const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

router.post("/create-task", async(req,res) => {
    try{
        const {title, description} = req.body;
        const { id } = req.headers;
        const newTask = new Task({title:title, description:description});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id,{ $push: {tasks:taskId._id}});
        res.status(200).json({message: "task created"});
    }catch(error) {
        console.log(error);
        return res.status(400).json({message: "internal server error"});
    }
});

router.get("/get-all-task", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: {sort: {createdAt: -1}},
        });
        res.status(200).json({data: userData});
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "internal server error"});
    }

})
router.put("/update-task/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await User.findByIdAndUpdate(id, {title:title, descption:description})
        res.status(200).json({message: "task updated successfully"});
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "internal server error"});
    }

})
router.put("/update-important-tasks/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, {important: !ImpTask});
        res.status(200).json({message: "task updated successfully"});
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "internal server error"});
    }

})

router.put("/update-completed-task/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, {complete: !ImpTask});
        res.status(200).json({message: "task updated successfully"});
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "internal server error"});
    }

})

router.get("/get-important-task", authenticateToken, async(req, res) => {
    try {
        const { id } = req.header;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: {important:true},
            options: {sort: {createdAt: -1}},
        });
        const ImpTaskData = Data.tasks;
        res.status(200).json({data: ImpTaskData});
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "internal server error"});
    }
    router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.headers.id;
            await Task.findByIdAndDelete(id);
            await User.findByIdAndDelete(userId, {$pull :{tasks:id}});
            res.status(200).json({message: "task deleted successfully"});
        }catch (err){
            console.log(err);
            return res.status(400).json({message: "internal server error"});
        }
    })

})



module.exports = router;