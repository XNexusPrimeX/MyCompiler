// @ts-nocheck

import codes from './codes.ts';

export default {
    [codes.SintaxError]: (expectedType) => `expected ${expectedType}`,
    [codes.UnexpectedToken]: (token) => `This token can't be parsed: "${token}"`,
    [codes.UnexpectedCharacter]: (character) => `${character}`,
    [codes.DivisionByZero]: () => 'The division by zero is impossible',
    [codes.OperandType]: () => `Unsupported operand type`,
    [codes.RuntimeError]: () => `No instructions to evaluate this type: ${type}`
}