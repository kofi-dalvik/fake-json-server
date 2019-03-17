const fs = require('fs');
const path = require('path');

const normalizedPath = path.join(__dirname, 'snapshots');

//finding the current snapshot
let currentSnapshot = fs.readdirSync(normalizedPath).sort().pop();

let db = {};

if (currentSnapshot) {
    //require current snapshot
    db = require('./snapshots/' + currentSnapshot);
} else {
    //require all seeds
    const seedsPath = path.join(__dirname, 'seeds');

    fs.readdirSync(seedsPath).forEach(filename => {
        let schema = filename.split('.').shift();
        db[schema] = require('./seeds/' + filename)();
    });
}

module.exports = db;


