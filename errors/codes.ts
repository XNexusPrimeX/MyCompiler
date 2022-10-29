// deno-lint-ignore-file no-explicit-any
const keys = [
    'SintaxError',
    'UnexpectedToken',
    'UnexpectedCharacter',
    'DivisionByZero',
    'OperandType',
    'RuntimeError'
] as const;

type _export = {
    [K in typeof keys[any]]: K;
};
export default <_export>Object.fromEntries(keys.map(key => [key, key]));