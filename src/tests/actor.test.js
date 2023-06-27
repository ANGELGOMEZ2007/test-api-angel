const supertest = require("supertest")
const app = require("../app")

let actorId

test("GET -> '/api/v1/actors' should return status code 200", async () => {
    const res = await supertest(app).get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
})

test("POST -> '/api/v1/actors', should return status code 201", async () => {
    const body = {
        firstName: 'Jeon',
        lastName: 'Do-yeon',
        nationality: 'South Korea',
        image:
            'https://www.lavanguardia.com/peliculas-series/images/all/profile/1973/2/20737/w1280/ev2tT7ZbReE06rZy7SX0Mv8evZ7.jpg',
        birthday: '1973-02-11'
    }
    const res = await supertest(app).post('/api/v1/actors').send(body)
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
})

test("PUT -> '/api/v1/actors/:id', should return status code and and res.body.firstName === actor.firstName", async () => {
    const actor = {
        firstName: 'Jeon'
    }

    const res = await supertest(app).put(`/api/v1/actors/${actorId}`).send(actor)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> '/api/v1/actors/:id', should return status code 204", async () => {
    const res = await supertest(app).delete(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(204)
  })