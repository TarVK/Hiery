import {IDataHook} from "model-react";
import {getHooked} from "../utils/getHooked";
import {bindingsBundle, IBindingBundle, IBindingBundleObject} from "../_types/bindings/IBindingBundle";
import {IParentBindingData} from "../_types/bindings/IParentBindingData";
import {IAnyNode} from "../_types/nodes/IAnyNode";
import {ISubscribable} from "../_types/utils/ISubscribable";

/**
 * Creates a map of parent bindings with source and index data from the given bundles
 * @param inputBundles The bindings to transform into parent bindings
 * @param hook The hook to subscribe to changes
 * @returns The mapping from nodes to their bindings
 */
export function createParentBindings(
    inputBundles: ISubscribable<IBindingBundle[]>,
    hook?: IDataHook
): Map<IAnyNode<any>, IParentBindingData<any>[]> {
    const bundles = getHooked(inputBundles, hook);

    const parentBindings: Map<IAnyNode<any>, IParentBindingData<any>[]> = new Map();
    let indexCounter = 0;
    for (let bundleData of bundles) {
        const bundle = isBindingBundleObject(bundleData) ? bundleData[bindingsBundle] : bundleData;
        const bindings = getHooked(bundle, hook);

        for (let binding of bindings) {
            const node = binding.node;
            let nodeBindings = parentBindings.get(node);
            if (!nodeBindings) {
                nodeBindings = [];
                parentBindings.set(node, nodeBindings);
            }

            // Create the parent binding from the binding
            const index = indexCounter++;
            nodeBindings.push({
                node,
                getData: hook => ({
                    sources: new Set([bundleData]),
                    index,
                    data: "subscribableData" in binding ? getHooked(binding.subscribableData, hook) : binding.data,
                }),
            });
        }
    }

    return parentBindings;
}

/**
 * Checks whether a given bundle is a bundle object
 * @param bundle The bundle to be checked
 * @returns Whether the bundle is an object with a bindingsBundle key containing the actual bindings
 */
export function isBindingBundleObject(bundle: IBindingBundle): bundle is IBindingBundleObject {
    return bindingsBundle in bundle;
}
