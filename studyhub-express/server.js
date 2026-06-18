const express = require("express")
const dotenv = require("dotenv")
const notesRouter = require("./routes/notes")


const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())

app.use('/api/notes', notesRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;

  console.error(err);

  res.status(status).json({
    error: {
      message: status < 500 ? err.message : 'Internal server error',
      details: status < 500 ? err.details : undefined
    }
  });
});


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})