const Note = require("../models/Note")

function canModify(note, user) {
  return note.author.equals(user.id) || user.role === "instructor";
}

const createNote = async(req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title, 
      content: req.body.content, 
      course: req.body.course, 
      tags: req.body.tags, 
      author: req.user.id
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
      .select("title course createdAt author likes content tags")
      .populate("author", "name email role");

    const total = await Note.countDocuments(filter);

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
    const note = await Note.findById(req.params.id).populate("author", "name email role");;

    if (!note) return res.status(404).json({ error: { message: "Note not found" } });

    if (!note.isPublic && !req.user)
      return res.status(401).json({ error: { message: "Not authenticated" } });

    res.json({
      data: note
    });
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: { message: "Not found" } });
    if (!canModify(note, req.user)) return res.status(403).json({ error: { message: "Forbidden" } });
    
    const saved = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("author", "name email role");

    res.json({ data: saved });
  } catch (err) { next(err); }
};

const likeNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true }
    ).populate("author", "name email role");

    if (!note) {
      return res.status(404).json({
        error: { message: "Note not found" },
      });
    }

    res.json({ data: note });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ error: { message: "Not found" }});
    if (!canModify(note, req.user)) return res.status(403).json({ error: { message: "Forbidden" } });

    await note.deleteOne();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};



module.exports = {
getNotes,
createNote,
updateNote,
deleteNote,
getOneNote,
likeNote,
}


