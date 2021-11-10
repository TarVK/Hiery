import {IDataHook} from "model-react";
import {IBinding} from "../../bindings/IBinding";
import {IBindingData} from "../../bindings/IBindingData";
import {IBindingInput} from "../../bindings/IBindingInput";
import {IParentBindingData} from "../../bindings/IParentBindingData";
import {INodeInfo} from "../../INodeInfo";
import {IParentNode} from "../IParentNode";

/**
 * A node to transform data of its children into bindings for its parent node(s)
 * @param I The input data for bindings of this node
 * @param PI The input data of this parent's bindings
 */
export type ITransformerNode<I, PI> = {
    /**
     * Retrieves bindings of a parent node, given a list of bindings for this
     * @param data The list of extended binding data
     * @param hook The data hook to subscribe to changes
     * @returns The bindings for the parent action
     */
    get(bindings: IBindingData<I>[], hook?: IDataHook): IParentBindingData<PI>[];

    /**
     * Creates a new binding for this node
     * @param data The data to bind to the node
     * @returns The created binding
     */
    bind(data: IBindingInput<I>): IBinding<I>;

    /** The parents of this node, that this node creates bindings for */
    parents: IParentNode<PI>[];

    /** Info about the node */
    info: INodeInfo;
};
