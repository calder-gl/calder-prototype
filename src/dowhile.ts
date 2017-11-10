import While from './while';

export default class DoWhile extends While {
    public source(): string {
        return `do ${this.loopBlock.source()}` +
            `while (${this.condition.source()})`;
    }
}

