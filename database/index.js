const fs = require('fs');
const path = require('path');

const normalizedPath = path.join(__dirname, 'snapshots');

//finding the current snapshot
let currentSnapshot = fs.readdirSync(normalizedPath).sort().pop();

const saveConfig = (config) => {
    fs.writeFile('./../config.json', config, function (err) {
        if (err) throw err;
    });
}

//update current snapshot to include new seeds
let config = {
    routes: []
};

try {
    config = require('./config.json');
} catch (error) {
    saveConfig(JSON.stringify({routes: []}));
}

let thereIsAChange = false;

let db = {};

const seedsPath = path.join(__dirname, 'seeds');

if (currentSnapshot) {
    //require current snapshot
    db = require('./snapshots/' + currentSnapshot);

    fs.readdirSync(seedsPath).forEach(filename => {
        let schema = filename.split('.').shift();

        if (config.routes.indexOf(schema) < 0) {
            thereIsAChange = true;
            config.routes.push(schema);
            db[schema] = require('./seeds/' + filename)();
        }
    });
} else {
    //require all seeds
    fs.readdirSync(seedsPath).forEach(filename => {
        let schema = filename.split('.').shift();
        config.routes.push(schema);
        db[schema] = require('./seeds/' + filename)();
    });

    thereIsAChange = true;
}

if (thereIsAChange) {
    //write config
    config = JSON.stringify(config);
    saveConfig(config)
}



//save routes to config settings
module.exports = db;


