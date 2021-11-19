import {IBindingData} from "../_types/bindings/IBindingData";
import {IParentBindingData} from "../_types/bindings/IParentBindingData";
import {INodeInfo} from "../_types/INodeInfo";
import {IParentNode} from "../_types/nodes/IParentNode";
import {IAnyNode} from "../_types/nodes/IAnyNode";
import {ITransformerNode} from "../_types/nodes/types/ITransformerNode";
import {IDataTransformer} from "./_types/IDataTransformer";
import {TDerived} from "./_types/TDerived";

/**
 * Creates a new alternative node
 * @param config The configuration to create the alternative node from
 * @returns The created alternative node
 */
export function createAlternativeNode<I, PI = never, TI = never>(
    config: {
        /** The parents that this transformer creates bindings for */
        parents: IParentNode<PI>[];
        /** The targets which this node should provide alternatives for */
        targets: IAnyNode<TI>[];
        /** Combines the input data to the parent's input data */
        init: IDataTransformer<
            I,
            {
                /**
                 * Retrieves bindings of a parent node, given a list of bindings for this
                 * @param caught The list of bindings to provide alternatives for
                 * @returns The bindings for the parent action
                 */
                transform(caught: IBindingData<TDerived<TI>>[]): IParentBindingData<PI>;

                /**
                 * Retrieves with what priority this node wants to provide a alternative for the given target bindings, bindings being absent or having priority 0 represents not wanting to provide alternatives for them
                 * @param targetBindings The bindings of the nodes to create alternatives for
                 * @returns THe mapping of target bindings to their priorities
                 */
                getPriorityForAlternatives(targetBindings: IBindingData<TDerived<TI>>[]): Map<IBindingData<TDerived<TI>>, number>; // TODO: replace number with priority
            }
        >;
    } & INodeInfo
): ITransformerNode<I, PI> {
    return null as any; // TODO:
}
