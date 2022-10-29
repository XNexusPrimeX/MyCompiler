// deno-lint-ignore-file no-explicit-any
import codes from "./codes.ts";
import messages from "./messages.ts";

class InterpreterError<C extends typeof codes[keyof typeof codes]> extends Error {
    code: string;
    constructor(code: C, ...args: Parameters<typeof messages[C]>) {
        super(buildMessage(code, args));

        this.code = code;
        Error.captureStackTrace(this, InterpreterError);
    }

    get name() {
        return `[${this.code}]`;
    }
}

export default InterpreterError;

function buildMessage(code: typeof codes[keyof typeof codes], args: string[]) {
    const msg = messages[code];

    if (!msg) throw new Error(`No message associated with error code: ${code}.`);
    if (typeof msg === 'function') return msg(...args);
    if (!args?.length) return msg;

    args.unshift(msg);
    return String(...args);
}