let keys = [
    'SintaxError',
    'UnexpectedToken',
    'UnexpectedCharacter'
] as const;

type _export = {
    [K in typeof keys[any]]: K;
};
export default <_export>Object.fromEntries(keys.map(key => [key, key]));