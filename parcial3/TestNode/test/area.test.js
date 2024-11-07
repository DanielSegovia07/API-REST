import assert from 'node:assert';
import test from 'node:test';
import * as area from "../src/area.js";

test("si le mando un 2 debe dar 4", () =>{
    let res = area.areaCuadrado(2);
    assert.strictEqual(res,4);
})