var express = require('express');
const Mooves = require('../model/Moovies');
var router = express.Router();

/* GET home page. */
router.get('/moves', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* POST Create a new Movie */
router.post('/moves', async  function(req, res, next) {
      const {title, category, country, year,  imdb_score, director_id } = req.body
      const movie = await new Mooves({
        title, category, country, year, imdb_score,director_id
      })
      movie.save()
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          console.log(err);
      });

});


/* GET ALL mooves */
router.get('/api/movies',  function(req, res, next) {
    const allMovees = Mooves.find()
    allMovees.then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});



/* GET Empty */
router.get('/api/movies/:movee_id',  function(req, res, next) {
    const allMovees = Mooves.findById(req.params.movee_id)
    allMovees.then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});

  
/* PUT Update */
router.put('/api/movies/:movee_id',  function(req, res, next) {
    const allMovees = Mooves.findByIdAndUpdate(
        req.params.movee_id,
        req.body
    )
    allMovees.then(data => {
        if(!data) 
            next({message: `Bunaqa ID yo'q Tekshirib koring`, code: 404})
        
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});
  


/* DELETE Update */
router.delete('/api/movies/:movee_id',  function(req, res, next) {
    const allMovees = Mooves.findByIdAndRemove( req.params.movee_id )
    allMovees.then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});



/* GET top10 */
router.get('/api/moviess/top10',  function(req, res, next) {
    const allMovees = Mooves.find().limit(10).sort({imdb_score: -1});
    allMovees.then(data => {
        res.json(data)
    })
});

  
/* GET Year-YEAR */
router.get('/api/between/:star_year/:end_year',  function(req, res, next) {
    const {star_year, end_year} = req.params
    // greater then equal
    const allMovees = Mooves.find({
        year: {"$gte" : (star_year),  "$lte" : (end_year)}
    });
    allMovees.then(data => {
        res.json(data)
    })

});
  





module.exports = router;
