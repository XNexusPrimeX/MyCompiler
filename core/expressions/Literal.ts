import { Expression } from "@structures";

export class NumberLiteral extends Expression {
    kind = 'NumberLiteral' as const;
    value: number;

    constructor(options: Omit<NumberLiteral, 'kind'>) {
        super();

        this.value = options.value;
    }
}