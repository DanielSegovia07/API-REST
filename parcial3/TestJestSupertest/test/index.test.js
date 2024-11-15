const request = require("supertest");
const url = 'http://localhost:3002';

describe('Conjunto de pruebas:', () => { 
    it('Revisar que un servidor me de un 200', () => { 
        request(url)
            .get('/empleado')
            .end(function(err, res) {
                expect(res.statusCode).toBe(200);
            });
    });
});
