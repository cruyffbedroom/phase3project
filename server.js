import express from 'express';
import * as path from 'path'; // for handling file paths


//create express app object and sets port to 4000
const app = express();
const PORT = 4000;

//calls app.use to implement a static file server from "public" directory
app.use(express.static(path.join(__dirname, 'public')));


//use app.listen to start the server
app.listen(PORT, () => {
    console.log(`Your server is running on Port ${PORT} `)
})