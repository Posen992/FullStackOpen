const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    console.log('tb',returnedObject);
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    console.log('ta',returnedObject);
  },
});

module.exports = mongoose.model("Comment", commentSchema);
