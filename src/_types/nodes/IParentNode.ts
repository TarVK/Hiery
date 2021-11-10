import {IAlternativeNode} from "./types/IAlternativeNode";
import {ICombinerNode} from "./types/ICombinerNode";
import {IInterfaceNode} from "./types/IInterfaceNode";

/**
 * A node that can be used as a parent of another node
 * @param T The input type of this parent node
 */
export type IParentNode<T> = IInterfaceNode<T, any> | ICombinerNode<T, any> | IAlternativeNode<T, any, any>;
