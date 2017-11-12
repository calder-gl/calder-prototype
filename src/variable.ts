import VariableSource from './variablesource';
import Type from './type';
import Hashable from './util/hashable';

export default class Variable implements Hashable {
    public readonly variableSrc: VariableSource;

    constructor(variableSrc: VariableSource) {
        this.variableSrc = variableSrc;
    }

    public declaration(): string {
        return this.variableSrc.declaration();
    }

    public name(): string {
        return this.variableSrc.srcName;
    }

    public type(): Type {
        return this.variableSrc.srcType;
    }

    public hashCode(): string {
        return this.declaration();
    }
}
