const mongoose = require("mongoose")

const sprintSchema = mongoose.Schema({
    title:String,
    description:String,
    startDate:String,
    targetDate:String,
    favourite:Boolean,
    users:[],
    status:Boolean,
    userID:String,
})

const SprintModel = mongoose.model("sprint", sprintSchema)

module.exports = {
    SprintModel
}

