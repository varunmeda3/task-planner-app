const express = require("express");
const { SprintModel } = require("../Model/Sprint.model");

const sprintRouter = express.Router();

sprintRouter.get("/", async (req, res) => {

        const userID = req.body.userID;

    try {

        const sprints = await SprintModel.find({userID});

        res.send( { data : sprints } );

    } 
    catch (error) {

        console.log(err);

        res.send({"err" : "Something went wrong", "errMsg":`${error}`});
    
    }
});

sprintRouter.post("/", async (req, res) => {

    const payload = req.body;
    

    try{
        const new_sprint = new SprintModel(payload);

        await new_sprint.save();

        res.send({"msg" : "Sprint Added successfully",new_sprint,payload});
    } 

    catch (error) {

        console.log(err);

        res.send({"err" : "Something went wrong", "errMsg":`${error}`});
    }
});

sprintRouter.patch("/:sprintID", async (req, res) => {
    
        const sprintID = req.params.sprintID;
        const userID = req.body.userID;
        let payload=req.body;

    try { 

        const sprint = await SprintModel.findOne({_id:sprintID});

            if(userID !== sprint.userID){

                res.send({"msg" :"Not authorised"});

            }

            else{

                await SprintModel.findByIdAndUpdate({_id : sprintID},payload);

                res.send({"msg" : "Sprint updated successfully"});
            }
    }

    catch (error) {

        console.log(err);

        res.send({"err" : "Something went wrong", "errMsg":`${error}`});
    }
});

sprintRouter.delete("/:sprintID", async (req, res) => {
    
        const sprintID = req.params.sprintID;
        const userID = req.body.userID;

    try { 

        const sprint = await SprintModel.findOne({_id:sprintID});
            
            if(userID !== sprint.userID){

                res.send({"msg" :"Not authorised"});

            }

            else{

                await SprintModel.findByIdAndDelete({_id : sprintID});

                res.send({"msg" : "Sprint deleted successfully"});

            }
    } 
    
    catch (error) {
        
        console.log(err);
        
        res.send({"err" : "Something went wrong", "errMsg":`${error}`});
    }
})


module.exports = {sprintRouter}