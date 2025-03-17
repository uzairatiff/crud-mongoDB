import express from "express";
import mongoose from "mongoose";
import todoModel from "./model/todoSchema.js";



const URI = "mongodb+srv://uzairatif911:uzairatif911@cluster0.map97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URI)
.then(()=>console.log("mongodb connected"))
.catch((error)=>console.log("mongodb failed to connect" , error.message))


const app = express()
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/createTodo" , async (req  , res)=>{
    try {
        const response = await todoModel.create(req.body)
        console.log(response);
        
        res.json({
            message : "todo created"
        })
    } catch (error) {
        console.log(error.message);
        
    }
})

app.get("/getTodos" , async (req , res)=>{
    try {
        const todoResponse = await todoModel.find()
        console.log(todoResponse);

        res.json({
            message : "fetch all todos",
            data : todoResponse
        })
        
    } catch (error) {
        res.json({
            message : error.message || "failed to get"
        })
        
    }
})


app.post("/updateTodo/:id" , async (req ,res)=>{
    try {
        console.log(req.params.id); 
    
    const updateResponse = await todoModel.findByIdAndUpdate(req.params.id , body)

    res.json({
        message : "updated succssesfully",
        data : updateResponse
    })
    } catch (error) {
        res.json({
            message : "failed to upgate"
        })
    }
    
})






app.listen(PORT , ()=>{
    console.log("server running on http://localhost:5000");
    
})