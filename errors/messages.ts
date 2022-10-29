import errorCode from './codes.ts';

const makeMessages = (msgs: {[key in typeof errorCode[keyof typeof errorCode]]: (...args: string[]) => string }) => msgs;

export default makeMessages({
    [errorCode.Sintax]: () => `Invalid Sintax`,
    [errorCode.Parse]: (token) => `This token can't be parsed: "${token}"`,
    [errorCode.UnexpectedCharacter]: (character) => `Invalid character: "${character}"`,
    [errorCode.ZeroDivision]: () => 'The division by zero is impossible',
    [errorCode.Type]: (expectedType, obtainedType) => `Expected type: ${expectedType}, but got: ${obtainedType}`,
    [errorCode.Runtime]: (type) => `No instructions to evaluate this type: ${type}`,
});