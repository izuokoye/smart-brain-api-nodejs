
const handleRegister = (db, bcrypt) => (req, res) => {
    const {name, email, password} = req.body;

    // Form validation
    if(!name || !email || !password) {
        return res.status(400).json('All fields are required');
    }

    db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            password: bcrypt.hashSync(password),
            joined: new Date()})
        .then(response => {
            res.json(response[0]);
        }).catch(err => {
        res.status(400).json('Unable to register');
    });


};

module.exports = {
    handleRegister
};