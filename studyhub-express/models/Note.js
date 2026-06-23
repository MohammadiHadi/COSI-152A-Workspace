const mongoose = require("mongoose")
const User = require("../models/User")

const noteSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 120 },
        content: { type: String, maxlength: 5000 },
        course: { type: String, required: true, trim: true },
        tags: { type: [String], default: [] },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional until auth (Session 14)
        likes: { type: Number, default: 0, min: 0 },
        isPublic: { type: Boolean, default: true }
    }, 
    {
        timestamps: true,
        toJSON: {virtuals: true}

    }
)

noteSchema.methods.getContentSummary = function () {
  if (!this.content) return "";
  return this.content.slice(0, 100) + "...";
};

noteSchema.statics.findByAuthor = function(authorId) 
{ 
    return this.find({author: authorId}); 
}

noteSchema.virtual("tagCount").get(function () {
  return this.tags ? this.tags.length : 0;
});

module.exports = mongoose.model('Note', noteSchema)