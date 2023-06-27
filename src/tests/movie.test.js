const supertest = require('supertest')
const app = require('../app')
const Actor = require('../modals/Actor')
const Director = require('../modals/Director')
const Genre = require('../modals/Genre')
require('../modals/index')

let movieId

test("POST -> '/api/v1/movies', should return status code 201", async () => {
    const body = {
        name: 'Boksoon debe morir',
        image: 'https://i.blogs.es/0d4e97/boksoon-debe-morir/1366_2000.jpeg',
        synopsis: 'Un thriller de acción coreano que balancea la historia de una mujer perfecta como asesina a sueldo, la mejor en su profesión, pero que tiene más problemas a la hora de ejercer como madre de su hija adolescente. Con grandes escenas de acción, funciona mejor cuando el toque cómico tiene algo más de presencia -genial la escena inicial de presentación-, pero incluso cuando se atasca un poco sigue resultando bien entretenida.',
        releaseYear: 2016
    }

    const res = await supertest(app).post('/api/v1/movies').send(body)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/movies', should return status code 200", async () => {
    const res = await supertest(app).get('/api/v1/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].actors)
    expect(res.body[0].directors)
    expect(res.body[0].genres)
})



test("PUT -> '/api/v1/movies/:id', should return status code 200 and and res.body.name === movie.name", async () => {
    const movie = {
        name: 'Boksoon debe morir'
    }

    const res = await supertest(app).put(`/api/v1/movies/${movieId}`).send(movie)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
})

test("POST -> '/api/v1/movies/:id/actors', set movies actors, should return status code 200 and res.body.length = 1", async () => {
    const body = {
        firstName: 'Jeon',
        lastName: 'Do-yeon',
        nationality: 'South Korea',
        image:
            'https://www.lavanguardia.com/peliculas-series/images/all/profile/1973/2/20737/w1280/ev2tT7ZbReE06rZy7SX0Mv8evZ7.jpg',
        birthday: '1973-02-11'
    }

    const actor = await Actor.create(body)

    const res = await supertest(app)
        .post(`/api/v1/movies/${movieId}/actors`)
        .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    actor.destroy()
})

test("POST -> '/api/v1/movies/:id/directors', set movies directors, should return status code 200 and res.body.length = 1", async () => {
    const body = {
        firstName: 'Byun',
        lastName: 'Sung-hyun',
        nationality: 'South Korea',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_TiEezR53PP4loWphxdaU-ZEqbsM9DB8thI9LNeRl35SniSWeaRo5cdXCIZ0uWJ1Ap8&usqp=CAU',
        birthday: '1980-12-02'
    }

    const director = await Director.create(body)

    const res = await supertest(app)
        .post(`/api/v1/movies/${movieId}/directors`)
        .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    director.destroy()
})

test("POST -> '/api/v1/movies/:id/genres', set movies genres, should return status code 200 and res.body.length = 1", async () => {
    const body = {
        name: 'accion'
    }

    const genre = await Genre.create(body)

    const res = await supertest(app)
        .post(`/api/v1/movies/${movieId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    genre.destroy()
})

test("DELETE -> '/api/v1/movies/:id', should return status code 204", async () => {
    const res = await supertest(app).delete(`/api/v1/movies/${movieId}`)
    expect(res.status).toBe(204)
})
