// Importing required modules
const fs = require('fs'); // File system module to interact with the file system
const express = require('express'); // Express framework for building web applications
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
// const { exec } = require('node:child_process'); // Node.js child process module (commented out)
// const spawn = require('child_process').spawn; // To spawn child processes (commented out)
// const mysql = require('mysql'); // MySQL module for database interactions (commented out)
const config = require('config'); // Configuration management module
const Importer = require('mysql-import'); // Module to import SQL files into a MySQL database

const livereload = require('livereload'); // Module for live reloading during development
const connectLiveReload = require("connect-livereload"); // Middleware to connect live reload server
const path = require('path'); // Module for handling file paths

const app = express(); // Create an Express application

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(connectLiveReload()); // Enable live reloading in Express

const PORT = 4000; // Define the port for the server
const liveReloadServer = livereload.createServer(); // Create a live reload server
// Watch the 'public' directory for changes
liveReloadServer.watch(path.join(__dirname, 'backups/'));
// Refresh the page once a client connects
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Initialize arrays and variables to store file data
myArray2 = []; // Array for processed file names
myArray3 = []; // Array for further processing
var data1 = {}; // Object to hold database table data
data1.table = []; // Initialize the table property as an array
var id = 1; // Initialize a unique ID for each file
const dir = 'backups/backups/'; // Directory where backup SQL files are stored

// Read all files in the backups directory
const files = fs.readdirSync(dir); // Synchronously read files from the directory
console.log(files); // Log the list of files
table = []; // Initialize a table array
console.log("this is the file ", files); // Log the files for debugging
console.log(files.length); // Log the number of files

// Loop through each file to process its name and store information
for (var i = 0; i < files.length; i++) {
    myArray1 = files[i].split(".sql"); // Split the filename by '.sql' extension
    console.log('affichage de tableau ' + myArray1); // Log the split filename for debugging
    for (j = 0; j < myArray1.length - 1; j++) {
        myArray2 = myArray1[j].split(/\s+/).join(''); // Remove whitespace from the filename
        console.log("this is array 2", myArray2); // Log the processed filename
        myArray3 = myArray2.split("-"); // Split the filename by '-'
        console.log(myArray3); // Log the split parts of the filename
        var obj = {}; // Create an object to hold the file data
        obj._id = id++; // Assign a unique ID to the object
        // Construct the SQL filename from the processed parts
        obj.files = myArray3[0] + '-' + myArray3[1] + '-' + myArray3[2] + '-' + myArray3[3] + '.sql';
        data1.table.push(obj); // Add the object to the data1.table array
    }
}

// Set up a route that sends the data every second
setInterval(() => {
    app.get('/', (req, res) => {
        let p = JSON.stringify(data1.table); // Convert the table data to JSON format
        res.send(p); // Send the JSON response to the client
    });
}, 1000); // Repeat every 1000 milliseconds (1 second)

// Route to handle file downloads
app.get('/download/:_id', (req, res) => {
    // Find the file based on the provided ID in the request parameters
    const singleFile = data1.table.find((item) => item._id === parseInt(req.params._id));
    if (!singleFile) {
        return res.status(404).send('file not found'); // Return 404 if the file is not found
    }
    console.log(singleFile); // Log the found file for debugging
    // Download the SQL file from the backups directory
    res.download(`backups/${singleFile.files}`);
});

// Function to restore a database from a SQL file
const restore = (a, b) => {
    const importer = new Importer(b); // Create a new Importer instance with the database connection
    // New onProgress method, added in version 5.0!
    importer.onProgress(progress => {
        var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100; // Calculate the progress percentage
        console.log(`${percent}% Completed`); // Log the progress percentage
    });

    // Import the SQL file
    importer.import(a).then(() => {
        var files_imported = importer.getImported(); // Get the list of imported files
        console.log(`${files_imported.length} SQL file(s) imported.`); // Log the number of imported files
    }).catch(err => {
        console.error(err); // Log any errors that occur during import
    });
};

// Route to handle database restoration
app.get('/restoredb/:_id', (req, res) => {
    // Find the file to restore based on the provided ID
    let singleFile = data1.table.find((item) => item._id === parseInt(req.params._id));
    let filename = `backups/${singleFile.files}`; // Construct the full path to the SQL file
    let connection = config.get("db"); // Get the database connection configuration
    res.send(`<script>${restore(filename, connection)}</script>`); // Send a script to restore the database
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`running on ${PORT}`); // Log the server status
});
