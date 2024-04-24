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
    return await collection.find().toArray();
}

dbStartup();

// export the getCustomers() method
module.exports = { getCustomers };