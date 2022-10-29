import { TokenType, Keyword } from "@constants";
import InterpreterError from "@errors";

export class Token {
    type: TokenType
    value: string

    constructor(type: TokenType, value: any) {
        this.type = type;
        this.value = value;
    }
}

export class Tokenizer {
    returns = new Array<Token>();
    private source: Array<string>;

    private pushToken(...args: ConstructorParameters<typeof Token>) {
        this.returns.push(new Token(...args));
    }
    
    constructor(code: string) {
        this.source = code.split('');

        const binaryOp = /[!=<>*/%+-]/;
        const whitespace = /[\s\t\n]/;
        const numbers = /[0-9]/;
        const letters = /[a-z]/i;

        while(this.source.length > 0) {
            if(['(', ')'].includes(this.source[0])) {
                this.pushToken(TokenType.Paren, this.source.shift());
            }
            else if(this.source[0] === '"') {
                let value = '';

                this.source.shift();

                while (this.source[0] !== '"') {
                    value += this.source.shift();
                }

                this.source.shift();
                
                this.pushToken(TokenType.String, value);
            }
            else if(this.source[0] === '=' && this.source[1] !== '=') {
                this.pushToken(TokenType.Equals, this.source.shift());
            }
            else if(binaryOp.test(this.source[0])) {
                let value = '';

                while (binaryOp.test(this.source[0])) {
                    value += this.source.shift();
                }

                this.pushToken(TokenType.BinaryOperator, value);
            }
            else if(numbers.test(this.source[0])) {
                let value = '';
                
                while (numbers.test(this.source[0])) {
                    value += this.source.shift();
                }   
                
                this.pushToken(TokenType.Number, value);
            }
            else if(letters.test(this.source[0])) {
                let ident = "";
				while (this.source.length > 0 && letters.test(this.source[0])) {
					ident += this.source.shift();
				}

				const reserved = Keyword.find(v => v === ident);

				if (reserved) {
                    if(['true', 'false'].includes(ident)) {
                        this.pushToken(TokenType.Boolean, ident);
                    } else {
                        this.pushToken(TokenType.Keyword, ident);
                    }
				} else {
					this.pushToken(TokenType.Identifier, ident);
				}
            }
            else if(whitespace.test(this.source[0])) {
                this.source.shift();
            }
            else {
                throw new InterpreterError("UnexpectedCharacter", this.source[0]);
            }
        }

        this.pushToken(TokenType.EOF, 'End of File');
    }
}