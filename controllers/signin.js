
const handleSignIn = (db, bcrypt) => (req, res) => {

    const { email, password} = req.body;

    // Form validation
    if(!email || !password) {
        return res.status(400).json('All fields are required');
    }

    db.select('*').from('users')
        .where('email', '=', email)
        .then(user => {
            // if it returns blank
            if(user.length){
                const isPasswordValid = bcrypt.compareSync(password, user[0].password);

                if(isPasswordValid){
                    const newUser = {
                        id: user[0].id,
                        name: user[0].name,
                        email: user[0].email,
                        entries: user[0].entries,
                        joined: user[0].joined
                    };
                    res.json(newUser);
                }else{
                    res.status(400).json('Invalid login');
                }
            }else {
                res.status(400).json('Invalid login');
            }

        }).catch(err => {
        res.status(400).json('Invalid login');
    });
};

module.exports = {
    handleSignIn
};