import Type from './type';

export default class Variable {
    public readonly name: string;
    public readonly kind: Type;

    constructor(kind: Type, name: string) {
        this.kind = kind;
        this.name = name;
    }

    public declaration(): string {
        return `${this.kind} ${this.name};`;
    }
}
