import * as path from " https://deno.land/std/path/mod.ts ";
import { Parser, Runtime, Tokenizer } from '@core/stages/mod.ts'

switch (Deno.args[0]) {
	case 'run': {
		const filePath = Deno.args[1];
		const dirname = path.dirname(path.fromFileUrl(import.meta.url));
		
		const input = await Deno.readTextFile(path.join(dirname, filePath));
		interpreter(input);

		break;
	}
	default: {
		if(Deno.args[0].length < 1) {
			console.log('\nMathpreter v0.1');
	
			while(true) {
		    const input = prompt('> ');
		    if(!input) continue;
		
		    if(input === '.exit') {
		        Deno.exit(1);
		    }
		
		    interpreter(input);
		}

			break
	}
}

function interpreter(input: string) {
		try {
        const tokens = new Tokenizer(input).returns;
        const program = new Parser(tokens).returns;
        const result = new Runtime(program).returns; 
        
        console.log(result?.value);
    } catch(e) {
        console.error(e);
		}
}