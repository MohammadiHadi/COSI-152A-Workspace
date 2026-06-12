// const os = require("os")
// const fs = require("fs")
// const path = require("path")

import os from "os"
import fs from "fs"
import path from "path"


console.log("Curent working directory:", process.cwd())
console.log("Curent Node version:", process.version)

console.log("OS:", os.platform())
console.log("User home directory:", os.homedir())

const filePath = path.join(process.cwd(), "example.txt")
console.log("File path: ", filePath)

fs.writeFileSync(filePath, "Hello from Node.js modules!")

fs.readFile(filePath, "utf-8", (err, data) => {
    if(err)
        console.log("Error reading file: ", err)
    console.log(data)
})

const port = process.env.PORT || 3000
console.log("PORT is: ", port)