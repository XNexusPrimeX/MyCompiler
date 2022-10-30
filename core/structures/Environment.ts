import InterpreterError from "../../errors/mod.ts";
import { RuntimeVal } from "../stages/03-Runtime.ts";

export class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeVal>;

  constructor(parentENV?: Environment) {
    this.parent = parentENV;
    this.variables = new Map();
  }

  public declareVar(varname: string, value: RuntimeVal): RuntimeVal {
    if (this.variables.has(varname)) {
      throw new InterpreterError('IdentifierError', `Identifier "${varname}" has already been declared`);
    }

    this.variables.set(varname, value);
    return value;
  }

  public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolve(varname);
    env.variables.set(varname, value);
    return value;
  }

  public lookupVar(varname: string): RuntimeVal {
    const env = this.resolve(varname);
    return env.variables.get(varname) as RuntimeVal;
  }

  public resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }

    if (this.parent == undefined) {
      throw new InterpreterError('IdentifierError', `"${varname}" is not defined`);
    }

    return this.parent.resolve(varname);
  }
}