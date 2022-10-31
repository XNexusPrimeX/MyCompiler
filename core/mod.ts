import { Environment } from "@structures";
import { GlobalDeclarations, Parser, Runtime, Tokenizer } from "./stages/mod.ts";

export default class Interpreter {
    static env = new Environment();
    static run(input: string) {
        try {
            const tokens = new Tokenizer(input).returns;
            const program = new Parser(tokens).returns;
            const result = new Runtime(program, this.env).returns; 
            
            console.log(result?.value);
        } catch(e) {
            console.error(e);
        }
    }
}