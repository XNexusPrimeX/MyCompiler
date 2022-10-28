import { TokenType } from "@constants";
import { Statement } from "@structures";
import { BinaryExpression, Identifier, NumberLiteral } from '@expressions';
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
    program: Program;

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
                    })

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

            while(['/', '*', '%'].includes(<string>this.at().value)) {
                const operator = this.eat().value as string;
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

            while(['+', '-'].includes(<string>this.at().value)) {
                const operator = this.eat().value as string;
                const right = multiplicitaveParse();
                left = new BinaryExpression({
                    left,
                    right,
                    operator,
                });
            }

            return left;
        }

        return additiveParse()
    }

    constructor(tokens: Tokenizer['tokens']) {
        this.tokens = tokens;

        const program = new Program();
        
        while(!this.isFileEnd()) {
            program.body.push(this.parse())
        }

        this.program = program;
    }
}