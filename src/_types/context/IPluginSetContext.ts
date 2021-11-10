import {ISiblingNode} from "../nodes/types/ISiblingNode";
import {IRawPluginContext} from "./IPluginContext";

/**
 * A plugin context that allows you to add and remove plugins using function calls
 */
export type IPluginSetContext = IRawPluginContext & {
    /**
     * Adds the given sibling node to the context
     * @param sibling The sibling to be added
     * @returns A function that can be invoked to remove the plugin
     */
    add(sibling: ISiblingNode<any, any>): () => void;

    /**
     * Removes the given sibling node from the context
     * @param sibling The sibling to be removed
     */
    remove(sibling: ISiblingNode<any, any>): void;
};
