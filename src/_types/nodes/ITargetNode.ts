import {IAlternativeNode} from "./types/IAlternativeNode";
import {ITransformerNode} from "./types/ITransformerNode";
import {IInterfaceNode} from "./types/IInterfaceNode";
import {ISiblingNode} from "./types/ISiblingNode";

/**
 * A node that can be used as a target of the alternative node
 * @param T The input type of this target node
 */
export type ITargetNode<T> =
    | IInterfaceNode<T, any>
    | ITransformerNode<T, any>
    | IAlternativeNode<T, any, any>
    | ISiblingNode<T, any>;
