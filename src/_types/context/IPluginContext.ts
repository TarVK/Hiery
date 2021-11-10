import {IDataHook} from "model-react";
import {ITargetNode} from "../nodes/ITargetNode";
import {ISiblingNode} from "../nodes/types/ISiblingNode";

/** The symbol to store the hiery plugin context under in an object */
export const hieryPlugins = Symbol("Hiery plugin context");

/** The possible plugin context that can be used to augment bindings */
export type IPluginContext = IRawPluginContext | {[hieryPlugins]: IRawPluginContext};

/** The plugin context object */
export type IRawPluginContext = {
    /**
     * Retrieves all siblings for the given node
     * @param node The node to retrieve the siblings of
     * @param hook The data hook to subscribe to changes
     * @returns All registered siblings of the node
     */
    get<T>(node: ITargetNode<T>, hook?: IDataHook): ISiblingNode<any, T>[];
};
