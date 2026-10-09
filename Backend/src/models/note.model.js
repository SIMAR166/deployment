const mongoose = require("mongoose")

// schema 
const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
})

// model
const noteModel = mongoose.model("notes",noteSchema)


module.exports=noteModel