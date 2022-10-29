import { additiveOperators, comparativeOperators, multiplicitateOperators, TokenType } from "@constants";
import { Statement } from "@structures";
import { BinaryExpression, BooleanLiteral, Identifier, NumberLiteral } from '@expressions';
import InterpreterError from "@errors";
import { Token, Tokenizer } from "./01-Tokenizer.ts";

export type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'Identifier'
    | 'BinaryExpression'
    | 'NullLiteral';

export class Program extends Statement {
    kind = 'Program' as const;
    body: Statement[] = [];
}

export class Parser {
    private tokens: Token[] = [];
    public returns: Program;

    private at() {
        return this.tokens[0] as Token;
    }
    private eat() {
        return this.tokens.shift() as Token;
    }
    private isFileEnd(): boolean {
        return this.tokens[0].type === TokenType.EOF;
    }
    private parse(): Statement {
        let primaryParse = () => {
            const tk = this.at().type;

            switch (tk) {
                case TokenType.Identifier:
                    return new Identifier({
                        symbol: <string>this.eat().value
                    });
                    
                case TokenType.Number:
                    return new NumberLiteral({
                        value: parseFloat(<string>this.eat().value)
                    });
                case TokenType.Boolean:
                    return new BooleanLiteral({
                        value: this.eat().value ? true : false
                    });
                case TokenType.BinaryOperator:
                    const binaryOp = this.eat();
                    const nextToken = this.eat();

                    const isAdditiveOperation = ['+', '-'].includes(binaryOp.value);

                    if(isAdditiveOperation && nextToken.type === TokenType.Number) {
                        return new NumberLiteral({
                            value: parseFloat(`${binaryOp.value}${nextToken.value}`)
                        })
                    } else {
                        throw new InterpreterError('SintaxError', 'number');
                    }
                        
                case TokenType.Paren:
                    this.eat();

                    const value = this.parse();

                    this.eat();

                    return value
                default:
                    Deno.exit(1);
            }
        }
        let multiplicitaveParse = () => {
            let left = primaryParse()

            while(multiplicitateOperators.includes(this.at().value)) {
                const operator = this.eat().value;
                const right = primaryParse();
                left = new BinaryExpression({
                    left,
                    right,
                    operator,
                });
            }

            return left;
        }
        let additiveParse = () => {
            let left = multiplicitaveParse()

            while(additiveOperators.includes(this.at().value)) {
                const operator = this.eat().value;
                const right = multiplicitaveParse();
                left = new BinaryExpression({
                    left,
                    right,
                    operator,
                });
            }

            return left;
        }
        let comparativeParse = () => {
            let left = additiveParse()
        
            while(comparativeOperators.includes(this.at().value)) {
                const operator = this.eat().value;
                const right = additiveParse();
                left = new BinaryExpression({
                    left,
                    right,
                    operator
                });
            }

            return left
        }

        return comparativeParse();
    }

    constructor(tokens: Tokenizer['returns']) {
        this.tokens = tokens;

        const program = new Program();
        
        while(!this.isFileEnd()) {
            program.body.push(this.parse())
        }

        this.returns = program;
    }
}