const express = require("express")
const dotenv = require("dotenv")
const notesRouter = require("./routes/notes")


const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())

app.use('/api/notes', notesRouter);

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Something went wrong',
      details: err.details || undefined
    }
  });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})