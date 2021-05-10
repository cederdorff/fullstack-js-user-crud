const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const fs = require('fs');

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({
    extended: true
})); //Parse URL-encoded bodies
app.use(cors()); //Enable All CORS Requests


app.get('/', (req, res) => {
    res.send('Hello User API!')
});

// READ: get all users
app.get('/users', (req, res) => {
    const users = fs.readFileSync('./users.json', 'utf8');
    console.log(users);
    return res.end(users);
});

// READ: get user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = fs.readFileSync('./users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find(item => item.id == id);
    return res.json(user);
});

// CREATE: create new user
app.post('/users', (req, res) => {
    let newUser = req.body;
    const timestamp = Date.now(); // dummy generated user id
    newUser.id = timestamp;
    const data = fs.readFileSync('./users.json', 'utf8');
    let users = JSON.parse(data);
    users.push(newUser);
    fs.writeFileSync('./users.json', JSON.stringify(users));
    return res.json(users);
});

// UPDATE: update existing user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    const data = fs.readFileSync('./users.json', 'utf8');
    let users = JSON.parse(data);
    let user = users.find(item => item.id == id);
    user.name = userData.name;
    user.mail = userData.mail;
    fs.writeFileSync('./users.json', JSON.stringify(users));
    return res.json(users);
});

// DELETE: delete user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = fs.readFileSync('./users.json', 'utf8');
    let users = JSON.parse(data);
    users = users.filter(item => item.id != id);
    fs.writeFileSync('./users.json', JSON.stringify(users));
    return res.json(users);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})