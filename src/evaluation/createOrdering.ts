import {IDependencyCycle} from "./_types/IDependencyCycle";
import {ITreeNode} from "./_types/ITreenode";

/**
 * Creates a new complete ordering, such that a child of node X is ahead of X in the output list
 * @param tree The tree to compute a complete tree from
 * @returns The complete ordering of the nodes in the tree, or a found dependency cycler that prevented a complete ordering from being found
 */
export function createOrdering(tree: ITreeNode): ITreeNode[] | IDependencyCycle {
    return null as any; // TODO:
}
