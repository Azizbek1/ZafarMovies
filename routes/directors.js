var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Derictor = require('../model/Directors');


/* GET home page.   */
router.get('/', function(req, res, next) {
     const derictor = Derictor.aggregate([
         {
             $lookup: {
                 from: 'moovies',
                 localField: '_id',
                 foreignField: 'director_id',
                 as: 'movies'
             }
         },
         {
             $unwind: {
                 path: '$movies'
             }
         },
         {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                }, 
                movies: {
                    $push: '$movies'
                }
            }
         },
         /* qisqartirma uslubi */
         {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                voovies: '$movies'
            }
         }
     ])  
     derictor.then(data => {
         res.json(data)
     })
});
/* GET home page.   */
router.put('/:director_id', function(req, res, next) {
     const derictor = Derictor.findByIdAndUpdate(req.params.director_id, req.body)  
     derictor.then(data => {
         res.json(data)
     })
});


/* GET home page.   */
router.delete('/:director_id', function(req, res, next) {
     const derictor = Derictor.findByIdAndRemove(req.params.director_id)  
     derictor.then(data => {
         res.json(data)
     })
});



/* GET home page. */
router.get('/:director_id', function(req, res, next) {
     const derictor = Derictor.aggregate([
         {
            $match: {
                '_id' : mongoose.Types.ObjectId(req.params.director_id)
            }
         },
         {
             $lookup: {
                 from: 'moovies',
                 localField: '_id',
                 foreignField: 'director_id',
                 as: 'movies'
             }
         },
         {
             $unwind: {
                 path: '$movies'
             }
         },
         {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                }, 
                movies: {
                    $push: '$movies'
                }
            }
         },
       
         /* qisqartirma uslubi */
         {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                voovies: '$movies'
            }
         }
     ])  
     derictor.then(data => {
         res.json(data)
     })
});



/* GET home page. */
router.post('/', function(req, res, next) {
    const director = new Derictor(req.body);
    director.save().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
    })
});




module.exports = router;
