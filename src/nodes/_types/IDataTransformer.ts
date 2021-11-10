import {IDataHook} from "model-react";
import {IBindingData} from "../../_types/bindings/IBindingData";

/** A function to combine bindings of the given input to the requested output */
export type IDataTransformer<I, O> = {
    /**
     * Transforms the binding data of a node into the given output
     * @param data The list of data to be combined
     * @param bindings The list of data to be combined together with metadata
     * @param hook The hook to subscribe to changes
     * @returns The output data
     */
    (data: I[], bindings: IBindingData<I>[], hook: IDataHook | undefined): O;
};
