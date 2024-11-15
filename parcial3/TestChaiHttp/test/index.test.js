let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3002';

describe('Conjunto de pruebas:', () => { 

    it('Revisar que un servidor me de un 200', (done) => { 
        chai.request(url)
            .get('/empleado')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

});
