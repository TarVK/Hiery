import {IDataRetriever} from "model-react";
import {IParentNode} from "../nodes/IParentNode";
import {IBindingData} from "./IBindingData";

/** The binding data for parents */
export type IParentBindingData<T> = (
    | IBindingData<T>
    | {
          /** Retrieves the binding data */
          getData: IDataRetriever<IBindingData<T>>;
      }
) & {
    /** The node which this binding is for */
    node: IParentNode<T>;
};
