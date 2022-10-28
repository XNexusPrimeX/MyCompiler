// @ts-nocheck

import codes from './codes.ts';

export default {
    [codes.SintaxError]: (expectedType) => `expected ${expectedType}`,
    [codes.UnexpectedToken]: (token) => `This token can't be parsed: "${token}"`,
    [codes.UnexpectedCharacter]: (character) => `${character}`
}