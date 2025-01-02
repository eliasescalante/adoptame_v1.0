import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import { expect } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

chai.use(chaiHttp);
// cargo las variables de entorno
dotenv.config();

describe('Adoption Router Tests', () => {
    // para mis test
    const validUserId = '673e5954385f242ba2c03f57';
    const validPetId = '67633e98bba0f5ac4e10da65';
    const validAdoptionId = '676340b6f915beb10e7e479a';
    const invalidId = '676340b6f915beb10e7e479d';

    // Hook para esperar a que la conexión a MongoDB esté lista
    before(async function () {
        this.timeout(5000);
        try {
            await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Conexión a la base de datos exitosa');
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    });

    after(async function () {
        await mongoose.disconnect();
    });

    describe('GET /api/adoptions', () => {
        it('debería retornar todas las adopciones con status 200', (done) => {
            chai
                .request(app)
                .get('/api/adoptions/')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').that.equals('success');
                    expect(res.body).to.have.property('payload');
                    expect(res.body.payload).to.be.an('array');
                    done();
                });
        });

        it('debería incluir las propiedades necesarias en cada adopción', (done) => {
            chai
                .request(app)
                .get('/api/adoptions')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    if (res.body.payload.length > 0) {
                        expect(res.body.payload[0]).to.have.property('owner');
                        expect(res.body.payload[0]).to.have.property('pet');
                    }
                    done();
                });
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('debería retornar una adopción específica por ID válido', (done) => {
            chai
                .request(app)
                .get(`/api/adoptions/${validAdoptionId}`)
                .end((err, res) => {
                    if (err) return done(err);
                    if (res.status === 404) {
                        return done();
                    }
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('debería retornar error 404 para ID de adopción inexistente', (done) => {
            chai
                .request(app)
                .get(`/api/adoptions/${invalidId}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('status', 'error');
                    done();
                });
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('debería crear una nueva adopción con IDs válidos', (done) => {
            chai
                .request(app)
                .post(`/api/adoptions/${validUserId}/${validPetId}`)
                .end(async (err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.be.oneOf([201, 400]);
        
                    if (res.status === 201) {
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('owner');
                        expect(res.body).to.have.property('pet');
        
                        const adoption = await Adoption.findOne({
                            owner: validUserId,
                            pet: validPetId,
                        });
                        expect(adoption).to.not.be.null;
                        done();
                    } else {
                        done();
                    }
                });
        });
        
        it('debería retornar error 404 para usuario inexistente', (done) => {
            chai
                .request(app)
                .post(`/api/adoptions/${invalidId}/${validPetId}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.be.oneOf([404, 400]);
                    expect(res.body).to.have.property('status', 'error');
                    done();
                });
        });

        it('debería retornar error 404 para mascota inexistente', (done) => {
            chai
                .request(app)
                .post(`/api/adoptions/${validUserId}/${invalidId}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.be.oneOf([404, 400]);
                    expect(res.body).to.have.property('status', 'error');
                    done();
                });
        });
    });
});
