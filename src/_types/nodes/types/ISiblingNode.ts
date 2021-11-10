import {IDataHook} from "model-react";
import {IBindingData} from "../../bindings/IBindingData";
import {IParentNode} from "../IParentNode";
import {ITargetNode} from "../ITargetNode";

/**
 * A node that can serve as a sibling of an existing node, inheriting its data and combining it into binding for this node's parent(s)
 * @param I The input data for bindings of this node (I.e. the input of bindings of the node this is a sibling of)
 * @param PI The data of this parent's bindings
 */
export type ISiblingNode<I, PI extends any> = {
    /**
     * Retrieves bindings of a parent node, given a list of bindings for this
     * @param data The list of extended binding data
     * @param hook The data hook to subscribe to changes
     * @returns The bindings for the parent action
     */
    get(bindings: IBindingData<I>[], hook?: IDataHook): IBindingData<PI>[];

    /** The parents of this node, that this node creates bindings for */
    parents: IParentNode<PI>[];

    /** The node that this node is a sibling of */
    sibling: ITargetNode<I>;
};
