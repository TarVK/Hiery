import {IDataRetriever} from "model-react";
import {IBindingBundle} from "./IBindingBundle";

/** All data associated to a binding */
export type IBindingData<T> = {
    /** The actual data of the binding */
    data: T;
    /** The index of the binding within the complete list of bindings that the interface node was called on */
    index: number;
    /** The sources that the binding data was derived from */
    sources: Set<IBindingBundle>;
};
