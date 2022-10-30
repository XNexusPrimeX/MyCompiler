// deno-lint-ignore-file no-explicit-any
const keys = [
    'Sintax',
    'Parse',
    'ZeroDivision',
    'UnexpectedCharacter',
    'Type',
    'Runtime',
    'Identifier'
] as const;

type _export = {
    [K in typeof keys[any]]: `${K}Error`;
};
export default <_export>Object.fromEntries(keys.map(key => [key, `${key}Error`]));