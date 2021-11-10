import {IDataHook} from "model-react";
import {IBinding} from "../../bindings/IBinding";
import {IBindingData} from "../../bindings/IBindingData";
import {IBindingInput} from "../../bindings/IBindingInput";
import {IParentBindingData} from "../../bindings/IParentBindingData";
import {INodeInfo} from "../../INodeInfo";
import {IParentNode} from "../IParentNode";
import {ITargetNode} from "../ITargetNode";

/**
 * A node that can be used to provide alternatives to an existing node. It can be used to block the target node from receiving certain bindings and to use the bindings that this node provides to it parents instead.
 * @param I The input data for bindings of this node
 * @param PI The input data of this parent's bindings
 * @param TI The input data of the nodes that this node provides alternatives to
 */
export type IAlternativeNode<I, PI, TI> = {
    /**
     * Initializes this node for the given bindings
     * @param bindings The bindings for this node
     * @param hook The data hook to subscribe to changes
     * @returns A function to get the priorities of alternatives to provide, and a function to get alternative bindings for a collection of caught bindings
     */
    init(
        bindings: IBindingData<I>[],
        hook?: IDataHook
    ): {
        /**
         * Retrieves bindings of a parent node, given a list of bindings for this
         * @param caught The list of bindings to provide alternatives for
         * @returns The bindings for the parent action
         */
        get(caught: IBindingData<TI>[]): IParentBindingData<PI>;

        /**
         * Retrieves with what priority this node wants to provide a alternative for the given target bindings, bindings being absent or having priority 0 represents not wanting to provide alternatives for them
         * @param targetBindings The bindings of the nodes to create alternatives for
         * @returns THe mapping of target bindings to their priorities
         */
        getPriorityForAlternatives(targetBindings: IBindingData<TI>[]): Map<IBindingData<TI>, number>; // TODO: replace number with priority
    };

    /**
     * Creates a new binding for this node
     * @param data The data to bind to the node
     * @returns The created binding
     */
    bind(data: IBindingInput<I>): IBinding<I>;

    /** The target nodes that this node provides alternatives to */
    targets: ITargetNode<TI>[];

    /** The parents of this node, that this node creates bindings for */
    parents: IParentNode<PI>[];

    /** Info about the node */
    info: INodeInfo;
};
