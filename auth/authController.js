const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8) }
];

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u=>u.username === username);
    if (!user) return res.status(404).send('user not found');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send('invalid password.');

    const token = jwt.sign({ id: user.id }, 'supersecret', {
        expiresIn: 86400 
    });

    res.status(200).send({ auth: true, token });
};
