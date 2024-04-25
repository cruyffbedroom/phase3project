const express = require('express');

const bodyParser = require('body-parser');



// imports data-acess.js

const da = require('./data-access');

// for handling file paths
const path = require('path');


//create express app object and sets port to 4000
const app = express();
const PORT = 4000;

//tells express to use the body-parser

app.use(bodyParser.json());

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

app.get("/customers/:id", async(req, res) => {

    //gets the id on the URL from the request object
    const id = req.params.id;

    //calls the data access getCustomerById method, passing the id value
    const [cust, err] = await da.getCustomerById(id);
    if (cust) {
        res.send(cust);
    } else {
        res.status(404);
        res.send(err);
    }
});

app.post('/customers', async(req, res) => {
    //checks request body, if null then response is 400 and returns text
    const newCustomer = req.body;
   
    const [status, id, errMessage] = await da.addCustomer(newCustomer);
    if (status === "success") {
        res.status(201);
        let response = { ...newCustomer };
        response["_id"] = id;
        res.send(response);
    } else {
        res.status(400);
        res.send(errMessage);
    }

});

app.put('/customers/:id', async(req, res) => {

    //gets the id parameter from the request object and puts it into id variable
    const id = req.params.id;

    //gets the request body rom the request object and puts it into the updated Customer variable
    const updatedCustomer = req.body;
    console.log(updatedCustomer)
    // if (updatedCustomer != null || req.body == {}) {
        // delete updatedCustomer._id;

        const [message, errMessage] = await da.updateCustomer(updatedCustomer);

        if (message) {
            res.send(message);
        } else {
            res.status(400);
            res.send(errMessage);
        }
    // } else {
    //     res.status(400);
    //     res.send("missing request body");
    // }
});

app.delete("/customers/:id", async(req, res) => {
    //gets the id on the url from the request object
    const id = req.params.id;

    //calls the data access deletecustomerbyid method, passing in the id value
    const [message, errMessage] = await da.deleteCustomerById(id);

    if (message) {
        res.send(message);

    } else {
        res.status(404);
        res.send(errMessage);
    }

})

//use app.listen to start the server
app.listen(PORT, () => {
    console.log(`Your server is running on Port ${PORT} `)
})
