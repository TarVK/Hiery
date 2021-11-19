import {IAlternativeNode} from "./types/IAlternativeNode";
import {ITransformerNode} from "./types/ITransformerNode";
import {IInterfaceNode} from "./types/IInterfaceNode";
import {ISiblingNode} from "./types/ISiblingNode";

/**
 * Any type of possible node
 * @param T The input type of this target node
 */
export type IAnyNode<T> =
    | IInterfaceNode<T, any>
    | ITransformerNode<T, any>
    | IAlternativeNode<T, any, any>
    | ISiblingNode<T, any>;
