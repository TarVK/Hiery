import {Field, IDataHook} from "model-react";
import {IRawPluginContext} from "../_types/context/IPluginContext";
import {IAnyNode} from "../_types/nodes/IAnyNode";
import {ISiblingNode} from "../_types/nodes/types/ISiblingNode";

/** A plugin context which plugins can be added to and removed from */
export class PluginSetContext implements IRawPluginContext {
    /** The plugins that were registered */
    protected plugins = new Field<Map<IAnyNode<any>, ISiblingNode<any, any>[]>>(new Map());

    /**
     * Retrieves all siblings for the given node
     * @param node The node to retrieve the siblings of
     * @param hook The data hook to subscribe to changes
     * @returns All registered siblings of the node
     */
    public get<T>(node: IAnyNode<T>, hook?: IDataHook): ISiblingNode<any, T>[] {
        const plugins = this.plugins.get(hook);
        return plugins.get(node) ?? [];
    }

    /**
     * Adds the given sibling node to the context
     * @param sibling The sibling to be added
     * @returns A function that can be invoked to remove the plugin
     */
    public add(sibling: ISiblingNode<any, any>): () => void {
        const remove = () => this.remove(sibling);

        const plugins = this.plugins.get();
        const siblings = plugins.get(sibling.sibling) || [];
        if (siblings.includes(sibling)) return remove;

        const newPlugins = new Map(plugins);
        newPlugins.set(sibling.sibling, [...siblings, sibling]);
        this.plugins.set(newPlugins);

        return remove;
    }

    /**
     * Removes the given sibling node from the context
     * @param sibling The sibling to be removed
     */
    public remove(sibling: ISiblingNode<any, any>): void {
        const plugins = this.plugins.get();
        const siblings = plugins.get(sibling.sibling);
        const index = siblings?.indexOf(sibling) ?? -1;
        if (!siblings || index == -1) return;

        const newPlugins = new Map(plugins);
        newPlugins.set(sibling.sibling, [...siblings.slice(0, index), ...siblings.slice(index + 1)]);
        this.plugins.set(newPlugins);
    }
}
