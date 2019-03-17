# Fake Json Server

This is a fake json server built on top of [json-server](https://github.com/typicode/json-server).

This projects only makes adding schema, saving and loading the database snapshot of json-server simple for use.

## Installation
1. Install json-server globally

```bash
npm install -g json-server
```
2. Clone this repo
```bash
git clone https://github.com/kofi-dalvik/fake-json-server.git
```

## Folder structure
- root
    - database
        - seeds (Your seeds go here)
        - snapshots (Created snapshots goes here)
        - index.js (Starts up your database)
    - .gitignore
    - app.js
    - package.json
    - README.md


## Usage
Start server by:
```bash
npm run serve
```
This will create a config.json file in database directory.

As you can see, all you have to do is to add your seeds to the seeds directory.
An example seed is provided in /database/seeds/users.js

Your seeds must export a function as in /database/seeds/users.js

## NB
Your seeds should be named according to how the routes will be accessed.
e.g /database/seeds/users.js will be accessed via http:localhost:3000/users and /database/seeds/posts.js will be accessed via http:localhost:3000/posts.

Read [json-server](https://github.com/typicode/json-server) docs for more.