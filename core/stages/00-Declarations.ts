import { Environment } from "@structures";
import { RuntimeVal } from "./03-Runtime.ts";

const globalVars: { [key: string]: RuntimeVal } = {
    x: {
        type: 'number',
        value: 4
    }
}

export class Declarations {
    constructor(env: Environment) {
        for(let [varName, varValue] of Object.entries(globalVars)) {
            env.declareVar(varName, varValue);
        }
    }
}