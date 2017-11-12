import Function from './function';
import InterfaceVariable from './interfacevariable';
import Qualifier from './qualifier';
import Type from './type';
import Set from './util/set';
import VariableSource from './variablesource';
import VariableDeclaration from './variabledeclaration';

export default class Shader {
    public main: Function;
    public inputDecls: VariableDeclaration<InterfaceVariable>[];
    public outputDecls: VariableDeclaration<InterfaceVariable>[];

    constructor(main: Function = new Function('main'),
                outputs: VariableDeclaration<InterfaceVariable>[] = [],
                inputs: VariableDeclaration<InterfaceVariable>[] = []) {
        this.main = main;
        this.inputDecls = inputs;
        this.outputDecls = outputs;
    }

    public source(): string {
      return `${this.inputDecls.map(input => input.source()).join('\n')}\n
              ${this.outputDecls.map(output => output.source()).join('\n')}\n
              ${this.main.source()}`;
    }

    public inputs(): Set<VariableSource> {
        return new Set(this.inputDecls.map(varDecl => varDecl.variable.variableSrc));
    }

    public outputs(): Set<VariableSource> {
        return new Set(this.outputDecls.map(varDecl => varDecl.variable.variableSrc));
    }
}
