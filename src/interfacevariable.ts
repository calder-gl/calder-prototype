import Hashable from './util/hashable';
import Qualifier from './qualifier';
import Type from './type';
import Variable from './variable';
import VariableSource from './variablesource';

export default class InterfaceVariable extends Variable {
    public readonly qualifier: Qualifier;

    constructor(qualifier: Qualifier, variableSrc: VariableSource) {
        super(variableSrc);
        this.qualifier = qualifier;
    }

    public declaration(): string {
        return `${this.qualifier} ${super.declaration()}`;
    }
}
