const supertest = require("supertest")
const app = require("../app")

let directorId

test("GET -> '/api/v1/directors', should return status code 200", async () => {
    const res = await supertest(app).get('/api/v1/directors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
  })

test("POST -> '/api/v1/directors', should return status code 201", async () => {
  const body = {
    firstName: 'Byun',
    lastName: 'Sung-hyun',
    nationality: 'South Korea',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_TiEezR53PP4loWphxdaU-ZEqbsM9DB8thI9LNeRl35SniSWeaRo5cdXCIZ0uWJ1Ap8&usqp=CAU',
    birthday: '1980-12-02'
  }

  const res = await supertest(app).post('/api/v1/directors').send(body)

  directorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(body.firstName)
})

test("PUT -> '/api/v1/directors/:id', should return status code and and res.body.firstName === director.firstName", async () => {
  const director = {
    firstName: 'Byun'
  }

  const res = await supertest(app).put(`/api/v1/directors/${directorId}`).send(director)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(director.firstName)
})

test("DELETE -> '/api/v1/directors/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/directors/${directorId}`)
  expect(res.status).toBe(204)
})