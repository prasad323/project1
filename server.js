const express = require('express');
const bodyParser = require('body-parser');
const { Contact, sequelize } = require('./models');
const { login } = require('./auth/authController');
const { verifyToken } = require('./auth/middleware');

const app = express();
app.use(bodyParser.json());

app.post('/login', login);

app.get('/protected', verifyToken, (req, res) => {
    res.send(`Hello User ${req.userId}`);
});


app.get('/contacts', verifyToken, async (req, res) => {
    const contacts = await Contact.findAll();
    res.send(contacts);
});

app.get('/contacts/:id', verifyToken, async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).send('Contact not found.');
    res.send(contact);
});

app.post('/contacts', verifyToken, async (req, res) => {
    const { name, company_name, designation, email_id } = req.body;
    if (!name || !company_name || !designation || !email_id) {
        return res.status(400).send('all fields are required');
    }
    const contact = await Contact.create({ name, company_name, designation, email_id });
    res.status(201).send(contact);
});

app.put('/contacts/:id', verifyToken, async (req, res) => {
    const { name, company_name, designation, email_id } = req.body;
    if (!name || !company_name || !designation || !email_id) {
        return res.status(400).send('All fields are required');
    }
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).send('contact not found');
    contact.name = name;
    contact.company_name = company_name;
    contact.designation = designation;
    contact.email_id = email_id;
    await contact.save();
    res.send(contact);
});

app.delete('/contacts/:id', verifyToken, async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).send('contact not found');
    await contact.destroy();
    res.status(204).send();
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
