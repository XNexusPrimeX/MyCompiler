import { Parser, Runtime, Tokenizer } from '@core/stages/mod.ts'

console.log('\nMathpreter v0.1');

while(true) {
    const input = prompt('> ');
    if(!input) continue;

    if(input === '.exit') {
        Deno.exit(1);
    }

    try {
        const tokens = new Tokenizer(input).returns;
        console.log(tokens)
        const program = new Parser(tokens).returns;
        const result = new Runtime(program).returns; 
        
        console.log(result?.value);
    } catch(e) {
        console.error(e);
    }
}