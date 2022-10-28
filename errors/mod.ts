import codes from "./codes.ts";
import messages from "./messages.ts";

class InterpreterError<C extends keyof typeof codes> extends Error {
    code: string;
    constructor(code: C, ...args: Parameters<typeof messages[C]>) {
        super(buildMessage(code, args));

        this.code = code;
        Error.captureStackTrace(this, InterpreterError);
    }

    get name() {
        return `${super.name} [${this.code}]`;
    }
}

export default InterpreterError;

function buildMessage(code: keyof typeof codes, args: [any]) {
    if (!(code in codes)) throw new Error('Error code must be a valid DiscordjsErrorCodes');
    const msg = messages[code];

    if (!msg) throw new Error(`No message associated with error code: ${code}.`);
    if (typeof msg === 'function') return msg(...args);
    if (!args?.length) return msg;

    args.unshift(msg);
    return String(...args);
}