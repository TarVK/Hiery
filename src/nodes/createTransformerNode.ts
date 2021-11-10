import {IParentBindingData} from "../_types/bindings/IParentBindingData";
import {INodeInfo} from "../_types/INodeInfo";
import {IParentNode} from "../_types/nodes/IParentNode";
import {ITransformerNode} from "../_types/nodes/types/ITransformerNode";
import {IDataTransformer} from "./_types/IDataTransformer";
import {TDerived} from "./_types/TDerived";

/**
 * Creates a new transformer node
 * @param config The configuration to create the transformer node from
 * @returns The created transformer node
 */
export function createTransformerNode<I, PI = never>(
    config: {
        /** The parents that this transformer creates bindings for */
        parents: IParentNode<PI>[];
        /** Combines the input data to the parent's input data */
        transform: IDataTransformer<I, IParentBindingData<TDerived<PI>>[]>;
    } & INodeInfo
): ITransformerNode<I, PI> {
    return null as any;
}
