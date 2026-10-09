const express= require("express")
 const app = express()

 const noteModel = require("./models/note.model")
 const path=require("path")
 
 const cors=require("cors")
  app.use(express.json())
 app.use(cors())
 // to send request from the frontend to the backend accept cross origin request 
 app.use(express.static("./public"))
//  to make the files in the public folder publicly available and avaiable files and let go not move down if the file not avaible then wild card will further handle that and send index.html as response 




//  post 

app.post("/api/notes", async(req,res)=>{
 
    const{title,description}=req.body

     const notes =  await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note is created 😁",
        notes
    })

})

// get
app.get("/api/notes",async (req,res)=>{
  const notes = await noteModel.find();
  res.status(200).json({
    message:"notes fetched successfully 😁",
    notes
  })
})

// delete
app.delete("/api/notes/:id",async(req,res)=>{
  const id= req.params.id
  await  noteModel.findByIdAndDelete(id)
  // this method will find and delete by the id 
  console.log(id)
  res.status(200).json({
    message:"note deleted successfully 😄"
  })
})

// patch
app.patch("/api/notes/:id",async(req,res)=>{
  // first apa id nu kd laina
 const id = req.params.id
 const { description }= req.body

  await noteModel.findByIdAndUpdate(id,{ description })

  res.status(200).json({
    message:"description updated successfully 😁"
  })
})

app.use('*name',(req,res)=>{
 res.sendFile(path.join(__dirname,"..","/public/index.html"))
//  __dirname namae give the whole path of the folder src as we are working on app.js which is in the src folder from the root then .. change the folder and move to public folder
})
 module.exports=app