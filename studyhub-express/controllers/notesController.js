const Note = require("../models/Note")


const createNote = async(req, res, next) => {
  const note = await Note.create(
    {
      title: req.body.title,
      content: req.body.content, 
      course: req.body.course, 
      tags: req.body.tags || [], 
      likes: req.body.likes || 0,

    });
  res.status(201).json({ data: note });
}

// const getNotes = (req, res) => {
// res.json({ data: notes });
// }
const getNotes = async(req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const {course} = req.query;

  const notes = await Note.find().sort({createdAt: 1}).select("title createdAt");

  const paginatedNotes = notes.slice((page - 1) * limit , page * limit);

  res.json({
    data: paginatedNotes,
    count: paginatedNotes.length,
    total: notes.length,
    page: page,
    limit: limit,
  });
};


const getOneNote = async(req, res, next) => {
  const note = await Note.findById(req.params.id);

  if(!note){
    const error = new Error('Note not found')
    error.status = 404
    return next(error)
  }

  res.json({
    data: note
  });
};

const updateNote = async(req, res , next) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedNote) {
    const error = new Error("Note not found")
    error.status = 404
    return next(error)
  }

  res.json({data: updatedNote})

}




const deleteNote = async(req, res , next) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id)

  if(!deleteNote){
    const error = new Error('Note not found')
    error.status = 404
    return next(error)
  }

  res.status(204).send()

}


module.exports = {
getNotes,
createNote,
updateNote,
deleteNote,
getOneNote,
}


