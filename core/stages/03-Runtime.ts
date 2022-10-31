import { AssignExpression, BinaryExpression, BooleanLiteral, Identifier, NumberLiteral, StringLiteral } from "@expressions";
import { Environment, Statement } from "@structures";
import InterpreterError from "@errors";
import { Program } from "./02-Parser.ts";
import { comparativeOperators, multiplicitateOperators } from "../constants/Operators.ts";

export interface RuntimeVal {
    type: string,
    value: any
}

interface NumberVal extends RuntimeVal {
    type: 'number',
    value: number
} 

export class Runtime {
    returns;

    private evaluate(astNode: Statement, env: Environment): RuntimeVal {
        switch(astNode.kind) {
            case 'Identifier': {
                return env.lookupVar((astNode as Identifier).symbol);
            }
            case 'NumberLiteral': {
                return {
                    type: 'number',
                    value: (astNode as NumberLiteral).value 
                };
            }
            case 'StringLiteral': {
                return {
                    type: 'string',
                    value: (astNode as StringLiteral).value
                }
            }
            case 'BooleanLiteral': {
                return {
                    type: 'boolean',
                    value: (astNode as BooleanLiteral).value
                }
            }
            case "NullLiteral": {
                return { value: "null", type: "null" };
            }
            case "AssignExpression": {
                const variable = astNode as AssignExpression;

                env.declareVar(variable.symbol, this.evaluate(variable.value, env));

                return { type: 'null', value: 'null' }
            }
            case "BinaryExpression": {
                const binOperation = astNode as BinaryExpression;

                const lhs = <NumberVal>this.evaluate(binOperation.left, env);
                const rhs = <NumberVal>this.evaluate(binOperation.right, env);
                
                return this.evalBinaryExpression(
                  lhs,
                  rhs,
                  binOperation.operator,
                );
            }
            case "Program": {
                let lastEvaluated = { type: "null", value: "null" };
                for (const statement of (astNode as Program).body) {
                    lastEvaluated = <any>this.evaluate(statement, env);
                }
                return lastEvaluated;
            }
            default: {
                throw new InterpreterError('RuntimeError', astNode.kind);
            }
        }
    }

    private evalBinaryExpression(lhs: RuntimeVal, rhs: RuntimeVal, operator: string) {
        let result: number;

        if(!comparativeOperators.includes(operator)) {
            if (lhs.type !== "number" && rhs.type !== "number") {
                throw new InterpreterError('TypeError');
            }
        }

        if(multiplicitateOperators.includes(operator)) {
            if([lhs.value, rhs.value].includes(0)) {
                throw new InterpreterError('ZeroDivisionError'); 
            }
        }

        result = eval(`${lhs.value} ${operator} ${rhs.value}`);

        return {
            type: 'number',
            value: result
        } as RuntimeVal
    }

    constructor(astNode: Statement, env: Environment) {
        this.returns = this.evaluate(astNode, env);
    }
}