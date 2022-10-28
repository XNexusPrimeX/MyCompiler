import { Parser, Runtime, Tokenizer } from '@core/stages/mod.ts'

console.log('\nInterpreter v0.1');

while(true) {
    const input = prompt('> ');
    if(!input) continue;

    if(input === '.exit') {
        Deno.exit(1)
    }

    const { tokens } = new Tokenizer(input);
    const { program } = new Parser(tokens);
    const { result } = new Runtime(program); 

    console.log(result)
}