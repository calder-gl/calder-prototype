import Hashable from './util/hashable';
import Qualifier from './qualifier';
import Type from './type';
import Variable from './variable';

export default class InterfaceVariable implements Hashable {
    public readonly name: string;
    public readonly qualifier: Qualifier;
    public readonly type: Type;
    public readonly variable: Variable;

    constructor(qualifier: Qualifier, variable: Variable) {
        this.qualifier = qualifier;
        this.name = variable.name;
        this.type = variable.type;
        this.variable = variable;
    }

    public declaration(): string {
        return `${this.qualifier} ${this.variable.declaration()}`;
    }

    public hashCode(): string {
        return this.declaration();
    }
}
