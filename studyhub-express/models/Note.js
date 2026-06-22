const mongoose = require("mongoose")

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
        timestamps: true
    }
)

// const Note = mongoose.model('Note', noteSchema)
// module.exports = Note


module.exports = mongoose.model('Note', noteSchema)