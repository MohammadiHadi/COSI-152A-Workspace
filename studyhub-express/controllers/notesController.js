// in-memory store 
let notes = [
  { id: 1, title: 'React Basics', course: 'COSI 152A', likes: 14 },
  { id: 2, title: 'JavaScript Arrays', course: 'COSI 153A', likes: 22 },
  { id: 3, title: 'DOM Manipulation', course: 'COSI 154A', likes: 18 },
  { id: 4, title: 'Express Routing', course: 'COSI 152A', likes: 31 },
  { id: 5, title: 'REST API Design', course: 'COSI 155A', likes: 27 },
  { id: 6, title: 'Middleware Basics', course: 'COSI 150A', likes: 19 },
  { id: 7, title: 'Error Handling in Express', course: 'COSI 152A', likes: 25 },
  { id: 8, title: 'Validation with Express Validator', course: 'COSI 152A', likes: 33 },
  { id: 9, title: 'HTTP Status Codes', course: 'COSI 153A', likes: 16 },
  { id: 10, title: 'Query Parameters', course: 'COSI 152A', likes: 21 },
  { id: 11, title: 'Route Parameters', course: 'COSI 154A', likes: 12 },
  { id: 12, title: 'Pagination Basics', course: 'COSI 152A', likes: 29 },
  { id: 13, title: 'Filtering API Results', course: 'COSI 152A', likes: 24 },
  { id: 14, title: 'Sorting API Results', course: 'COSI 152A', likes: 20 },
  { id: 15, title: 'JSON Responses', course: 'COSI 159A', likes: 17 },
  { id: 16, title: 'CRUD Operations', course: 'COSI 152A', likes: 35 },
  { id: 17, title: 'PUT vs PATCH', course: 'COSI 152A', likes: 23 },
  { id: 18, title: 'Deleting Resources', course: 'COSI 152A', likes: 15 },
  { id: 19, title: 'Controller Functions', course: 'COSI 152A', likes: 28 },
  { id: 20, title: 'API Testing with Postman', course: 'COSI 160A', likes: 30 },
];

let result = notes;

const createNote = (req, res, next) => {
  const { title, content, course } = req.body; // JSON body

  // res — building the response
  res.status(201).json({ data: { id: Date.now(), title, content } });
}

// const getNotes = (req, res) => {
// res.json({ data: notes });
// }
const getNotes = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const {course} = req.query;

  // filter by course
  if (course) {
    result = result.filter((note) => note.course === course);
  }


  const paginatedNotes = result.slice((page - 1) * limit , page * limit);

  res.json({
    data: paginatedNotes,
    count: paginatedNotes.length,
    total: result.length,
    page: page,
    limit: limit,
  });
};


module.exports = {
getNotes,
createNote,
}


