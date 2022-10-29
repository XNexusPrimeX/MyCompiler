import { Expression } from "@structures";

export class BinaryExpression extends Expression {
    kind = 'BinaryExpression' as const;
    left: Expression;
    right: Expression;
    operator: string;

    constructor(options: Omit<BinaryExpression, 'kind'>) {
        super();

        this.left = options.left;
        this.right = options.right;
        this.operator = options.operator;
    }
}