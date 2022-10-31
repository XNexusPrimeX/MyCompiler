import * as path from "https://deno.land/std@0.161.0/path/mod.ts"
import InterpreterError from "./errors/mod.ts";
import Interpreter from "./core/mod.ts";

switch (Deno.args[0]) {
	case 'run': {
		const file = Deno.args[1];
		const dirname = path.dirname(path.fromFileUrl(import.meta.url));
		const filepath = path.join(dirname, file);
		
		try {
			const input = await Deno.readTextFile(path.join(dirname, file));
			Interpreter.run(input);
		} catch(e) {
			if(e.name === 'NotFound') {
				console.log(new InterpreterError('NotFoundError', filepath))
			}
		}

		break;
	}
	default: {
		if(Deno.args.length < 1) {
			console.log('\nMathpreter v0.1');
	
			while(true) {
				const input = prompt('> ');
				if(!input) continue;
			
				if(input === '.exit') {
					Deno.exit(1);
				}
			
				Interpreter.run(input);
			}
		}
	}
}