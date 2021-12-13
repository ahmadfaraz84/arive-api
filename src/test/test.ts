import chaiHttp from 'chai-http'
import chai from "chai";
import {
    describe, it, before, after
} from 'mocha';
import User from "../models/user";
import Hobby from "../models/hobby";

import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("Arive Backend Test", function() {
    this.timeout(5000);
    before(async ()=>{
        try {
            await User.deleteMany();
            await Hobby.deleteMany();
        } catch (error) {
            throw new Error(error);
        }
    });

    after(async ()=>{
        try {
            await User.deleteMany();
            await Hobby.deleteMany();
        } catch (error) {
            throw new Error(error);
        }
    });


    describe('/ root route', async () => {
        it ('Should return a status of 200 OK', async () => {
            try {
                const response = await chai.request(app).get('/');
                response.should.have.status(200);
            } catch (err) {
                throw new Error(err);
            }
        });
    });

    describe('/user route', async () => {

        it ('should create a user in User schema', async () => {
            try {
                const user = {
                    name: "John Doe"
                }
                const response = await chai.request(app).post('/user')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(user);
                response.should.have.status(201);
                response.body.success.should.be.true;
                response.body.data.should.have.ownProperty('hobbies');
            } catch (err) {
                throw new Error(err);
            }
        });

        it ('should return a 400 Bad request error', async () => {
            try {
                const user = {}
                const response = await chai.request(app).post('/user')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(user);
                response.should.have.status(400);
            } catch (err) {
                throw new Error(err);
            }
        });

    });

  });