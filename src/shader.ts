import Function from './function';
import InterfaceVariable from './interface';
import Qualifier from './qualifier';
import Type from './type';
import Variable from './variable';
import Set from './util/set';

export default class Shader {
    public main: Function;

    constructor(main: Function = new Function('main')) {
        this.main = main;
    }

    public source(): string {
        return `${this.header()}\n${this.main.source()}`;
    }

    private header(): string {
        return [...this.main.dependencies()]
            .map(dependency => dependency.declaration())
            .join('\n');
    }

    public inputs(): Set<Variable> {
        return new Set([...this.main.dependencies()]
            .filter(dependency => dependency.qualifier == Qualifier.In
                || dependency.qualifier == Qualifier.InOut
                || dependency.qualifier == Qualifier.Attribute)
            .map(dependency => dependency.variable));
    }

    public outputs(): Set<Variable> {
        return new Set([...this.main.dependencies()]
            .filter(dependency => dependency.qualifier == Qualifier.Out
                || dependency.qualifier == Qualifier.InOut)
            .map(dependency => dependency.variable));
    }
}
