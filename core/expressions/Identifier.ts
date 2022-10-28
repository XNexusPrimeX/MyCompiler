import { Expression } from "@structures";

export class Identifier extends Expression {
    kind = 'Identifier' as const;
    symbol: string;

    constructor(options: Omit<Identifier, 'kind'>) {
        super();

        this.symbol = options.symbol;
    }
}