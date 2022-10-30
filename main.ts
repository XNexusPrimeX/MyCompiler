import { Declarations, Parser, Runtime, Tokenizer } from '@core/stages/mod.ts'
import { Environment } from "@structures";

console.log('\nMathpreter v0.1');

while(true) {
    const input = prompt('> ');
    if(!input) continue;

    if(input === '.exit') {
        Deno.exit(1);
    }

    try {
        const env = new Environment();
        new Declarations(env);

        const tokens = new Tokenizer(input).returns;
        const program = new Parser(tokens).returns;
        const result = new Runtime(program, env).returns; 
        
        console.log(result?.value);
    } catch(e) {
        console.error(e);
    }
}