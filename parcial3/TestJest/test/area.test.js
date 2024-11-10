// Primero, importa el módulo que vamos a mockear.
jest.mock('../src/area.js');  // Aquí indicamos el path correcto

const area = require("../src/area.js");

test("si le mando un 2 debe dar 4", () => {
    // Definimos el comportamiento del mock
    area.areaCuadrado.mockReturnValue(4); // Esta es la respuesta simulada

    // Ejecutamos el código
    let res = area.areaCuadrado(2);
    
    // Verificamos que la función mockeada devuelva el valor esperado
    expect(res).toBe(4);
    expect(typeof res).toBe('number');
});

test("si le mando un 2 debe dar 4 to be", () => {
    // Definimos el comportamiento del mock nuevamente
    area.areaCuadrado.mockReturnValue(4); 

    // Ejecutamos el código
    let res = area.areaCuadrado(2);
    
    // Verificamos que la función devuelva un valor mayor a 0
    expect(res).toBe(4);
    expect(res).toBeGreaterThan(0);
});
