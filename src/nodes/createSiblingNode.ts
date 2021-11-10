import {IParentBindingData} from "../_types/bindings/IParentBindingData";
import {INodeInfo} from "../_types/INodeInfo";
import {IParentNode} from "../_types/nodes/IParentNode";
import {ITargetNode} from "../_types/nodes/ITargetNode";
import {ISiblingNode} from "../_types/nodes/types/ISiblingNode";
import {IDataTransformer} from "./_types/IDataTransformer";
import {TDerived} from "./_types/TDerived";

/**
 * Creates a new sibling node
 * @param config The configuration to create the new sibling node from
 * @returns The created sibling node
 */
export function createSiblingNode<I, PI>(
    config: {
        /** The node for which this node is going to be a sibling */
        sibling: ITargetNode<I>;
        /** The parents that this combiner creates bindings for */
        parents: IParentNode<PI>[];
        /** Combines the input data to the parent's input data */
        transform: IDataTransformer<I, IParentBindingData<TDerived<PI>>[]>;
    } & INodeInfo
): ISiblingNode<I, PI> {
    return null as any;
}
