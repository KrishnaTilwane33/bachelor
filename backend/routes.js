const express = require('express');
const User = require('./User');
const Project = require('./Project');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).send('User registered successfully');
});

// User Login (simplified)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Create a new project
router.post('/projects', async (req, res) => {
    const { title, description, price, seller } = req.body;
    const newProject = new Project({ title, description, price, seller });
    await newProject.save();
    res.status(201).send('Project created successfully');
});

// Get all projects
router.get('/projects', async (req, res) => {
    const projects = await Project.find().populate('seller', 'username');
    res.json(projects);
});

module.exports = router;
