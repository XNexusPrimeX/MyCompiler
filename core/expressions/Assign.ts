import { Expression } from "../structures/Expression.ts";

export class AssignExpression extends Expression {
    kind = 'AssignExpression' as const;
    symbol: string;
    value: any;

    constructor(options: Omit<AssignExpression, 'kind'>) {
        super();

        this.symbol = options.symbol;
        this.value = options.value;
    }
}