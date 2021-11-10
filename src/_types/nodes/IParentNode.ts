import {IAlternativeNode} from "./types/IAlternativeNode";
import {ITransformerNode} from "./types/ITransformerNode";
import {IInterfaceNode} from "./types/IInterfaceNode";

/**
 * A node that can be used as a parent of another node
 * @param T The input type of this parent node
 */
export type IParentNode<T> = IInterfaceNode<T, any> | ITransformerNode<T, any> | IAlternativeNode<T, any, any>;
