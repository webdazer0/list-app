const { Router } = require('express');
const router = Router();
const Excercises = require('../models/Excercises');

router.get('/', (req, res) => {
    Excercises.find()
        .then(excercises => res.json(excercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const { username, description } = req.body;
    const duration = Number(req.body.duration);
    const newExcercise = new Excercises({
        username,
        description,
        duration
    });
    
    newExcercise.save()
        .then(() => res.json('Excercise added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    
    Excercises.findById(req.params.id)
        .then(excercise => res.json(excercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    
    Excercises.findByIdAndDelete(req.params.id)
        .then(() => res.json('Excercise Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', (req, res) => {
    
    Excercises.findById(req.params.id)
        .then(excercise => {
            excercise.username = req.body.username;
            excercise.description = req.body.description;
            excercise.duration = req.body.duration;

            excercise.save()
                .then(() => res.json('Excercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;