const router = require('express').Router();
let Work = require('../models/work.model');

router.route('/').get((req, res) => {
  Work.find()
    .then((works) => res.json(works))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newWork = new Work({
    username,
    description,
    duration,
    date,
  });

  newWork
    .save()
    .then(() => res.json('Work added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Work.findById(req.params.id)
    .then((work) => res.json(work))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Work.findByIdAndDelete(req.params.id)
    .then(() => res.json('Work deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Work.findById(req.params.id)
  .then(work => {
    work.username = req.body.username;
    work.description = req.body.description;
    work.duration = Number(req.body.duration);
    work.date = Date.parse(req.body.date);

    work.save()
    .then(() => res.json('Work updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: '+ err))
})

module.exports = router;
