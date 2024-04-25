//import mongodb client

const MongoClient = require('mongodb').MongoClient;

//connect to "custdb" database in mongodb
const dbName = 'custdb';
const baseUrl = "mongodb://127.0.0.1:27017";

//creates a "collection" variable pointing to the "customers" collection in the "custdb" db.
const collectionName = "customers";
const connectString = baseUrl + "/" + dbName;
let collection;

async function dbStartup() {
    const client = new MongoClient(connectString);
    await client.connect();
    collection = client.db(dbName).collection(collectionName);
}



//create a getCustomers() method taht calls find() on the "customers" collection and returns the result

async function getCustomers() {
    //wrap mongodb call inside of getCustomers() with try/catch
    try {
        const customers = await collection.find().toArray();
        //testing error
        // throw {"message": "an error occured"};
        //instead of returning customer data directly, return array
        return [customers, null];
    } catch (err) {
        console.log(err.message);
        return [null, err.message];
    }
}

async function resetCustomers() {

    //creates a variable pointing to ana rray contaning three customer objects
    let data = [{ "id": 0, "name": "Mary Jackson", "email": "maryj@abc.com", "password": "maryj"},
                { "id": 1, "name": "Karen Addams", "email": "karena@abc.com", "password": "karena"},
                { "id": 2, "name": "Scott Ramsey", "email": "scottr@abc.com", "password": "scottr"}];

    try {
        //deletes all existing records in the customer collection using the collection's deleteMany() method
        await collection.deleteMany({});

        //adds records from the customer array to the customer collection using the collection's insertMany() method
        await collection.insertMany(data);

        //gets a count of records in the collection
        const customers = await collection.find().toArray();

        const message = "data was refreshed. there are now " + customers.length + " customer records";

        //on success return message how many records are now in the collection
        return [message, null];
    } catch (err) {
        console.log(err.message);
        return [null, err.message];
    }
};

//takes newCustomer as a parameter and calls

async function addCustomer(newCustomer) {
    try {
        //calls "insertOne" on the customer collection and passes the newCustomer
        const insertResult = await collection.insertOne(newCustomer);
        return ["success", insertResult.insertedId, null];
    } catch (err) {
        console.log(err.message);
        return ["fail", null, err.message];
    }
}

dbStartup();

// export the getCustomers() method
module.exports = { getCustomers, resetCustomers, addCustomer };