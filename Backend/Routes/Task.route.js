const express = require("express");
const { TaskModel } = require("../Model/Task.model");

const taskRouter = express.Router();


taskRouter.get("/:sprintID", async (req, res) => {

    const sprintID = req.params.sprintID;
    const userID = req.body.userID;

    try{

        const tasks = await TaskModel.find({sprintID});

        res.send( { data : tasks } );

    }
    catch(err){

        console.log(err);

        res.send({"err" : "Something went wrong"});
    }
});

taskRouter.post("/", async (req, res) => {

    const payload = req.body;

    try{

        const new_task = new TaskModel(payload);

        const task = await new_task.save();

        res.send({"msg" : "Task Added successfully",task,payload});
    }

    catch(err){

        console.log(err);

        res.send({"err" : "Something went wrong"});

    }
});

taskRouter.patch("/:taskID", async (req, res) => {

    const taskID = req.params.taskID;
    const userID = req.body.userID;
    let payload=req.body;

    try{

    const task = await TaskModel.findOne({_id:taskID});

        if(userID !== task.userID){

            res.send({"msg" :"Not authorised"});

        }
        else{

            await TaskModel.findByIdAndUpdate({_id : taskID},payload);

            res.send({"msg" : "Task updated successfully"});

        }
    
    }
        catch(err){

            console.log(err);
    
            res.send({"err" : "Something went wrong"});
    
        }
})

    taskRouter.delete("/:taskID", async (req, res) => {

    const taskID = req.params.taskID;
    const userID = req.body.userID;

    try{

        const task = await TaskModel.findOne({_id:taskID});

        if(userID !== task.userID){

            res.send({"msg" :"Not authorised"});

        }

        else{

            await TaskModel.findByIdAndDelete({_id : taskID});

            res.send({"msg" : "Task deleted successfully"});

        }

    }
    catch(err){

        console.log(err);

        res.send({"err" : "Something went wrong"});

    }
    });


module.exports = {taskRouter}