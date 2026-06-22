const express = require("express")
const dotenv = require("dotenv")
const notesRouter = require("./routes/notes")
const mongoose = require("mongoose")


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

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Connected to MongoDB!")
  app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
}).catch((err)=>{
  console.log("Failed to connect to MongoDB", err)
})

// async function startServer() { 
//   try {
//     await mongoose.connect(process.env.MONGODB_URI); 
//     console.log("Connected to MongoDB!")
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });  
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1);
//   }
// }

// startServer()


