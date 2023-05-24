/* eslint-disable import/no-extraneous-dependencies */
const app = require('../index');
const supertest = require('supertest');
const { expect } = require('chai');

const request = supertest(app);

describe('GET /dogs', () => {
  it('debe retornar una lista de perros', async () => {
    const response = await request.get('http://localhost:3001/dogs');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});

describe('GET /dogs/:id', () => {
  it('debe retornar un perro específico', async () => {
    const id = '123'; // Reemplaza con un ID válido existente en tu base de datos
    const response = await request.get(`http://localhost:3001/dogs/${id}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.id).to.equal(id);
  });

  it('debe retornar un error si se proporciona un ID inválido', async () => {
    const id = 'invalid_id';
    const response = await request.get(`http://localhost:3001/dogs/${id}`);
    expect(response.status).to.equal(404);
  });
});


