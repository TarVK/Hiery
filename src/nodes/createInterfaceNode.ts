import {INodeInfo} from "../_types/INodeInfo";
import {IInterfaceNode} from "../_types/nodes/types/IInterfaceNode";
import {IDataTransformer} from "./_types/IDataTransformer";

/**
 * Creates a new interface node
 * @param config The configuration to create the interface node from
 * @returns The created interface node
 */
export function createInterfaceNode<I, O>(
    config: {
        /** Combines the input data to the output */
        combine: IDataTransformer<I, O>;
    } & INodeInfo
): IInterfaceNode<I, O> {
    return null as any; // TODO:
}
