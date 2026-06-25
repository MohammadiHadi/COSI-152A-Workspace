const Note = require("../models/Note")

const createNote = async(req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title, 
      content: req.body.content, 
      course: req.body.course, 
      tags: req.body.tags, 
    });
    res.status(201).json({ data: note });
  } catch(err){
    next(err)
  }
}

const getNotes = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const filter = req.user ? {} : { isPublic: true };

  try {
    const notes = await Note.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title course createdAt author")
      .populate("author", "name email");

    const total = await Note.countDocuments();

    res.json({
      data: notes,
      count: notes.length,
      total,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};

const getOneNote = async(req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      const error = new Error("Note not found")
      error.status = 404
      return next(error)
    }

    if (!note.isPublic && !req.user)
      return res.status(401).json({ error: { message: "Not authenticated" } });

    res.json({
      data: note
    });
  } catch (err) {
    next(err);
  }
};

const updateNote = async(req, res , next) => {
  try {
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
  } catch (err) {
    next(err)
  }
}


const deleteNote = async(req, res , next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      const error = new Error("Note not found")
      error.status = 404
      return next(error)
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}


module.exports = {
getNotes,
createNote,
updateNote,
deleteNote,
getOneNote,
}


