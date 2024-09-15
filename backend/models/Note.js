const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
//   name: String
    user:{
    // This is similar to a foreign key
    // we are keeping the userid of a different model here
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag: {
        type: String, 
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now // This is a function, do not write the function call because it will be called when this model is called ig
    }, 
});

module.exports = mongoose.model('notes', NotesSchema); // create a model of this schema and name the model (here is user) and then requires the schema that we are exporting