import * as path from "https://deno.land/std@0.161.0/path/mod.ts";
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
        }
        catch (e) {
            if (e.name === 'NotFound') {
                console.log(new InterpreterError('NotFoundError', filepath));
            }
        }
        break;
    }
    default: {
        if (Deno.args.length < 1) {
            console.log('\nMathpreter v0.1');
            while (true) {
                const input = prompt('> ');
                if (!input)
                    continue;
                if (input === '.exit') {
                    Deno.exit(1);
                }
                Interpreter.run(input);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLElBQUksTUFBTSwyQ0FBMkMsQ0FBQTtBQUNqRSxPQUFPLGdCQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDckIsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJO1lBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1YsSUFBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO2FBQzVEO1NBQ0Q7UUFFRCxNQUFNO0tBQ047SUFDRCxPQUFPLENBQUMsQ0FBQztRQUNSLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVqQyxPQUFNLElBQUksRUFBRTtnQkFDWCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUcsQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBRXBCLElBQUcsS0FBSyxLQUFLLE9BQU8sRUFBRTtvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYjtnQkFFRCxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0Q7S0FDRDtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTYxLjAvcGF0aC9tb2QudHNcIlxuaW1wb3J0IEludGVycHJldGVyRXJyb3IgZnJvbSBcIi4vZXJyb3JzL21vZC50c1wiO1xuaW1wb3J0IEludGVycHJldGVyIGZyb20gXCIuL2NvcmUvbW9kLnRzXCI7XG5cbnN3aXRjaCAoRGVuby5hcmdzWzBdKSB7XG5cdGNhc2UgJ3J1bic6IHtcblx0XHRjb25zdCBmaWxlID0gRGVuby5hcmdzWzFdO1xuXHRcdGNvbnN0IGRpcm5hbWUgPSBwYXRoLmRpcm5hbWUocGF0aC5mcm9tRmlsZVVybChpbXBvcnQubWV0YS51cmwpKTtcblx0XHRjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbihkaXJuYW1lLCBmaWxlKTtcblx0XHRcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZShwYXRoLmpvaW4oZGlybmFtZSwgZmlsZSkpO1xuXHRcdFx0SW50ZXJwcmV0ZXIucnVuKGlucHV0KTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGlmKGUubmFtZSA9PT0gJ05vdEZvdW5kJykge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhuZXcgSW50ZXJwcmV0ZXJFcnJvcignTm90Rm91bmRFcnJvcicsIGZpbGVwYXRoKSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRicmVhaztcblx0fVxuXHRkZWZhdWx0OiB7XG5cdFx0aWYoRGVuby5hcmdzLmxlbmd0aCA8IDEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdcXG5NYXRocHJldGVyIHYwLjEnKTtcblx0XG5cdFx0XHR3aGlsZSh0cnVlKSB7XG5cdFx0XHRcdGNvbnN0IGlucHV0ID0gcHJvbXB0KCc+ICcpO1xuXHRcdFx0XHRpZighaW5wdXQpIGNvbnRpbnVlO1xuXHRcdFx0XG5cdFx0XHRcdGlmKGlucHV0ID09PSAnLmV4aXQnKSB7XG5cdFx0XHRcdFx0RGVuby5leGl0KDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0SW50ZXJwcmV0ZXIucnVuKGlucHV0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iXX0=