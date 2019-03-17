//require important modules
const fs = require('fs');
const path = require('path');

/**
 * path to all snapshots
 *
 * @var {String}
 */
const normalizedPath = path.join(__dirname, 'snapshots');

/**
 * Holds the current snapshot if any
 *
 * @var {String}
 */
let currentSnapshot = fs.readdirSync(normalizedPath).sort().pop();

/**
 * Writes apps configurations to config file
 *
 * @param {Object} config
 * @returns {Undefined}
 */
const saveConfig = (config) => {
    fs.writeFile('./../config.json', config, function (err) {
        if (err) throw err;
    });
}

/**
 * To hold configs
 *
 * @var {Object}
 */
let config = {
    routes: []
};

/**
 * Reads config file if exists
 * Creates a new config file if error
 */
try {
    config = require('./config.json');
} catch (error) {
    saveConfig(JSON.stringify({routes: []}));
}

/**
 * Specifies if there's a change with the apps database schema
 *
 * @var {Boolean}
 */
let thereIsAChange = false;

/**
 * Holds the db(data) to be exported
 *
 * @var {Object}
 */
let db = {};

/**
 * Holds the path to seeds folder
 *
 * @var {String}
 */
const seedsPath = path.join(__dirname, 'seeds');


if (currentSnapshot) {
    //require current snapshot
    db = require('./snapshots/' + currentSnapshot);

    /**
     * Updates the current snapshot with new schemas added
     */
    fs.readdirSync(seedsPath).forEach(filename => {
        let schema = filename.split('.').shift();

        if (config.routes.indexOf(schema) < 0) {
            thereIsAChange = true;
            config.routes.push(schema);
            db[schema] = require('./seeds/' + filename)();
        }
    });
} else {
    /**
     * Creates new snapshot with the seeds
     */
    fs.readdirSync(seedsPath).forEach(filename => {
        let schema = filename.split('.').shift();
        config.routes.push(schema);
        db[schema] = require('./seeds/' + filename)();
    });

    thereIsAChange = true;
}

/**
 * Writes new config
 */
if (thereIsAChange) {
    config = JSON.stringify(config);
    saveConfig(config)
}


module.exports = db;


