import { TokenType, Keyword } from "@constants";
import InterpreterError from "@errors";

export class Token {
    type: TokenType
    value: string | undefined

    constructor(type: TokenType, value?: any | undefined) {
        this.type = type;
        this.value = value;
    }
}

export class Tokenizer {
    tokens = new Array<Token>();
    private source: Array<string>;

    private pushToken(...args: ConstructorParameters<typeof Token>) {
        if(!args[1]) args[1] = this.source.shift();
        
        this.tokens.push(new Token(...args));
    }
    
    constructor(code: string) {
        this.source = code.split('');

        const binaryOp = /[*/%+-]/;
        const whitespace = /[\s\t\n]/;
        const numbers = /[0-9]/;
        const letters = /[a-z]/i;

        while(this.source.length > 0) {
            if(['(', ')'].includes(this.source[0])) {
                this.pushToken(TokenType.Paren);
            }
            else if(binaryOp.test(this.source[0])) {
                this.pushToken(TokenType.BinaryOperator);
            }
            else if(this.source[0] === '=') {
                this.pushToken(TokenType.Equals);
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

				const reserved = Keyword[ident as keyof typeof Keyword];

				if (reserved) {
					this.pushToken(TokenType.Keyword, reserved);
				} else {
					this.pushToken(TokenType.Identifier, ident);
				}
            }
            else if(whitespace.test(this.source[0])) {
                this.source.shift();
            }
            else throw new InterpreterError("UnexpectedCharacter", this.source[0])
        }

        this.pushToken(TokenType.EOF, undefined);
    }
}