import fs from "fs/promises";

console.log("Task started...");

async function run() {
  try {
    const data = await fs.readFile("example.txt", "utf8");
    console.log("File content:");
    console.log(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

run();

console.log("This line runs while the file is being read...");

