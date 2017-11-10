import Variable from './variable';
import Function from './function';
import Qualifier from './qualifier';
import Type from './type';

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

    public inputs(): { kind: Type, name: string }[] {
        return [...this.main.dependencies()]
            .filter(dependency => dependency.qualifier == Qualifier.In
                || dependency.qualifier == Qualifier.InOut
                || dependency.qualifier == Qualifier.Attribute)
            .map(dependency => ({ kind: dependency.kind, name: dependency.name }));
    }

    public outputs(): { kind: Type, name: string }[] {
        return [...this.main.dependencies()]
            .filter(dependency => dependency.qualifier == Qualifier.Out
                || dependency.qualifier == Qualifier.InOut)
            .map(dependency => ({ kind: dependency.kind, name: dependency.name }));
    }
}
