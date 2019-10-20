
const handleImage = (db) => (req, res) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(response => {
            res.json(response);
        }).catch(err => {
        res.status(400).json('Unable to get entry');
    });
};

const handleApiCall = (clarifai) => (req, res) => {
    const { input } = req.body;
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(response => {
            res.json(response);
        }).catch(console.log)

}

module.exports = {
    handleImage,
    handleApiCall
};