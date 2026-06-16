// in-memory store 
let notes = [
{ id: 1, title: 'React Basics', course: 'COSI 152A', likes: 14 },
];

const createNote = (req, res, next) => {
const { title, content, course } = req.body; // JSON body
const { id } = req.params; // route param
const { sort } = req.query; // ?sort=likes


 if (!title) {
    const error = new Error('Title is required');
    error.status = 400;
    return next(error);
  }

// res — building the response
res.status(201).json({ data: { id: Date.now(), title, content } });
}

const getNotes = (req, res) => {
res.json({ data: notes });
}

module.exports = {
getNotes,
createNote
}


