import {ITreeNode} from "./_types/ITreenode";

/** An error class for dependency cycles */
export class CycleError extends Error {
    /** The dependency cycle that was found, with the first node being equivalent to the last */
    public cycle: ITreeNode[];

    /**
     * Creates a new error message from a dependency cycle
     * @param cycle The cycle that was found
     */
    public constructor(cycle: ITreeNode[]) {
        super(`Found a dependency cycle: ${cycle.map(({node}) => node.info.name.replace(/\s/, "-")).join(" -> ")}`);
        this.cycle = cycle;
    }
}
