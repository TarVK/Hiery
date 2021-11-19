import {IDataHook} from "model-react";
import {ITreeNode} from "./_types/ITreenode";

/**
 * Reduces the given ordering to its final result
 * @param ordering The ordering of the nodes from which to derive a final result
 * @param hook The hook to subscribe to changes
 * @returns The final result from the final node of the ordering
 */
export function reduceOrdering(ordering: ITreeNode[], hook?: IDataHook): any {
    return null as any; // TODO:
}
