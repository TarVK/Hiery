import {IDataHook} from "model-react";
import {IBinding} from "../../bindings/IBinding";
import {IBindingBundle} from "../../bindings/IBindingBundle";
import {IBindingInput} from "../../bindings/IBindingInput";
import {IPluginContext} from "../../context/IPluginContext";
import {INodeInfo} from "../../INodeInfo";
import {ISubscribable} from "../../utils/ISubscribable";

/**
 * A node to extract data from a given list of binding bundles
 * @param I The input data of bindings of this node
 * @param O THe output data that this node provides
 */
export type IInterfaceNode<I, O> = {
    /**
     * Extracts the output from the given bindingBundles
     * @param bindingBundles The bindings to get the output from
     * @param context The context from which to extract plugin data
     * @param hook The data hook to subscribe to changes
     * @returns The output that was extracted from the bundles
     */
    (bindingBundles: ISubscribable<IBindingBundle[]>, context?: IPluginContext, hook?: IDataHook): O;

    /**
     * Extracts the output from the given bindingBundles
     * @param bindingBundles The bindings to get the output from
     * @param hook The data hook to subscribe to changes
     * @returns The output that was extracted from the bundles
     */
    (bindingBundles: ISubscribable<IBindingBundle[]>, hook?: IDataHook): O;

    /**
     * Creates a new binding for this node
     * @param data The data to bind to the node
     * @returns The created binding
     */
    bind(data: IBindingInput<I>): IBinding<I>;

    /** Info about the node */
    info: INodeInfo;
};
