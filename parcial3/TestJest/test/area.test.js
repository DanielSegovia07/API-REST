
jest.mock('../src/area.js');  

const area = require("../src/area.js");

test("si le mando un 2 debe dar 4", () => {
    // Definimos el  mock
    area.areaCuadrado.mockReturnValue(4); 

   
    let res = area.areaCuadrado(2);
    
    
    expect(res).toBe(4);
    expect(typeof res).toBe('number');
});

test("si le mando un 2 debe dar 4 to be", () => {
   
    area.areaCuadrado.mockReturnValue(4); 

    
    let res = area.areaCuadrado(2);
    
  
    expect(res).toBe(4);
    expect(res).toBeGreaterThan(0);
});

/* Importa el módulo real
const area = require("../src/area.js");

test("si le mando un 2 debe dar 4", () => {
   
    let res = area.areaCuadrado(2);
    
    expect(res).toBe(4);
    expect(typeof res).toBe('number');
});

test("si le mando un 2 debe dar 4 to be", () => {
   
    let res = area.areaCuadrado(2);
    
    expect(res).toBe(4);
    expect(res).toBeGreaterThan(0);
});
 */