const { getAll, create, getOne, remove, update, setGenres, setDirectors, setActors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);


routerMovie.route('/:id/genres')// /movie/:id/genres
    .post(setGenres)

routerMovie.route('/:id/directors')//  /movies/:id/directors
    .post(setDirectors)

routerMovie.route('/:id/actors')//  /movies/:id/actors
    .post(setActors)
module.exports = routerMovie;