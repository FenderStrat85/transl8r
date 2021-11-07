const express = require('express');
const Router = require('../router');

const supertest = require('supertest');
const jwt = require('jsonwebtoken');
import db from '../models/db';

describe('User registration and login', () => {
  const app = express();
  app.use(express.json());
  app.use(Router);
  const request = supertest(app);

  //dummy user already exists in db => for authentication purposes we do not send email and password back.
  const dummyCustomer = {
    email: 'ann@ann.com',
    password: '123',
    firstName: 'Ann',
    lastName: 'Ann',
    role: 'customer',
  };
  const newDummyCustomer = {
    email: 'customer@customer.test',
    firstName: 'john',
    lastName: 'doe',
    role: 'customer',
    password: '123',
  };
  const dummyTranslator = {
    email: 'richard@richard.com',
    password: '123',
    firstName: 'Richard',
    lastName: 'Richard',
    role: 'translator',
  };
  const newDummyTranslator = {
    email: 'translator@translator.test',
    firstName: 'jane',
    lastName: 'doe',
    role: 'translator',
    password: '123',
    languages: ['Chinese', 'English', 'Italian'],
  };

  afterEach(async () => {
    const customer = await db.Customer.findOne({
      where: { email: 'customer@customer.test' },
    });
    if (!customer) return;
    await customer.destroy();
  });

  afterEach(async () => {
    const translator = await db.Translator.findOne({
      where: { email: 'translator@translator.test' },
    });
    if (!translator) return;
    await translator.destroy();
  });

  it('Existing customer should be able to login', async () => {
    const customer = {
      email: dummyCustomer.email,
      password: dummyCustomer.password,
    };

    const result = await request.post('/login').send(customer);
    expect(result.body.firstName).toBe(dummyCustomer.firstName);
    expect(result.body.role).toBe(dummyCustomer.role);
  });

  it('should be able to register a new customer', async () => {
    const result = await request.post('/register').send(newDummyCustomer);
    expect(result.body.firstName).toBe(newDummyCustomer.firstName);
    expect(result.body.role).toBe(newDummyCustomer.role);
  });

  it('Existing translator should be able to login', async () => {
    const translator = {
      email: dummyTranslator.email,
      password: dummyTranslator.password,
    };
    const result = await request.post('/login').send(translator);
    expect(result.body.firstName).toBe(dummyTranslator.firstName);
    expect(result.body.role).toBe(dummyTranslator.role);
  });

  it('should be able to register a new translator', async () => {
    const result = await request.post('/register').send(newDummyTranslator);
    expect(result.body.firstName).toBe(newDummyTranslator.firstName);
    expect(result.body.role).toBe(newDummyTranslator.role);
  });
});
