const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:String,
    description:String,
    type:String,
    assignee:String,
    status:String,
    startDate:String,
    targetDate:String,
    favourite:Boolean,
    userID:String,
    sprintID:String
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
    TaskModel
}

