import {ITreeNode} from "./ITreenode";

export type IDependencyCycle = {
    /** The cycle of nodes that was found */
    cycle: ITreeNode[];
};
