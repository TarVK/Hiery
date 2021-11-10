import {IDataRetriever} from "model-react";
import {IInterfaceNode} from "../nodes/types/IInterfaceNode";

/** A binding for a Hiery node */
export type IBinding<I> =
    | {
          /** The data of the binding */
          data: I;
          /** The node that is being bound */
          node: IInterfaceNode<I, any>;
      }
    | {
          /** The data of the binding */
          subscribableData: IDataRetriever<I>;
          /** The node that is being bound */
          node: IInterfaceNode<I, any>;
      };
