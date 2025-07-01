const request = require('supertest');
const app = require('./app');

let createdItem;

test('POST /items → create item', async () => {
  const res = await request(app).post('/items').send({ name: 'Pen' });
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe('Pen');
  createdItem = res.body; // Save for later tests
});

test('GET /items → return items', async () => {
  const res = await request(app).get('/items');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test('PUT /items/:id → update item', async () => {
  const res = await request(app)
    .put(`/items/${createdItem.id}`)
    .send({ name: 'Pencil' });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe('Pencil');
});

test('DELETE /items/:id → delete item', async () => {
  const res = await request(app).delete(`/items/${createdItem.id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.id).toBe(createdItem.id);
});
