require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Note = require("./models/Note");

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const user = await User.create({
      name: "Demo Student",
      email: "demo@student.com",
      passwordHash: "Example password"
    });

    console.log("Created user:", user);

    const note = await Note.create({
      title: "Population Demo Note",
      content: "This note has an author, so we can demonstrate populate().",
      course: "COSI 152A",
      tags: ["mongoose", "population"],
      author: user._id,
    });

    console.log("Created note:", note);

    await mongoose.connection.close();
    console.log("Done");
  } catch (err) {
    console.error(err);
    await mongoose.connection.close();
  }
};

seedUser();
