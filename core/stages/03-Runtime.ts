import { BinaryExpression, NumberLiteral } from "@expressions";
import { Statement } from "@structures";
import { Program } from "./02-Parser.ts";

export class Runtime {
    result;

    private evaluate(astNode: Statement) {
        switch(astNode.kind) {
            case 'NumberLiteral':
                return new NumberLiteral({ value: (astNode as NumberLiteral).value });
            case "NullLiteral":
                return { value: "null", type: "null" };
            case "BinaryExpression":
                let binOperation = astNode as BinaryExpression;

                const lhs = <NumberLiteral>this.evaluate(binOperation.left);
                const rhs = <NumberLiteral>this.evaluate(binOperation.right);

                if (lhs.kind == "NumberLiteral" && rhs.kind == "NumberLiteral") {
                    return this.evalBinaryExpression(
                      lhs,
                      rhs,
                      binOperation.operator,
                    );
                }

                return { type: "null", value: "null" };
            case "Program":
                let lastEvaluated = { type: "null", value: "null" };
                for (const statement of (astNode as Program).body) {
                    lastEvaluated = <any>this.evaluate(statement);
                }
                return lastEvaluated;
        }
    }

    private evalBinaryExpression(lhs: NumberLiteral, rhs: NumberLiteral, operator: string) {
        let result: number;

        // TODO: Division by zero checks

        result = eval(`${lhs.value} ${operator} ${rhs.value}`);

        return new NumberLiteral({
            value: result
        })
    }

    constructor(astNode: Statement) {
        this.result = this.evaluate(astNode);
    }
}