const express = require('express');

// imports data-acess.js

const da = require('./data-access');

// for handling file paths
const path = require('path');


//create express app object and sets port to 4000
const app = express();
const PORT = 4000;

//calls app.use to implement a static file server from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

//retrieves customers from mongodb using the data-access.js getCustomers() method

app.get("/customers", async(req, res) => {

    //db.getCustomers() call now returns an array, dereference array into variables cust and err
    const [cust, err] = await da.getCustomers();
    if (cust) {
        res.send(cust);
    } else {
        res.status(500);
        res.send(err);
    }
});

//calls data access layer's "reset customers" method
app.get("/reset", async(req, res) => {
    // dereference the array into the variables result and err
    const [result, err] = await da.resetCustomers();
    if (result) {
        res.send(result);
    } else {
        res.status(500);
        res.send(err);
    }
});


//use app.listen to start the server
app.listen(PORT, () => {
    console.log(`Your server is running on Port ${PORT} `)
})
