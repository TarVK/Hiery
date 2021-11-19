import {IDataHook} from "model-react";
import {defaultContext} from "../context/defaultContext";
import {IBindingBundle} from "../_types/bindings/IBindingBundle";
import {IPluginContext} from "../_types/context/IPluginContext";
import {IInterfaceNode} from "../_types/nodes/types/IInterfaceNode";
import {ISubscribable} from "../_types/utils/ISubscribable";
import {createOrdering} from "./createOrdering";
import {createParentBindings} from "./createParentBindings";
import {createDependencyGraph} from "./createDependencyGraph";
import {CycleError} from "./CycleError";
import {reduceOrdering} from "./reduceOrdering";

/**
 * Computes the final result of an interface node
 * @param interfaceNode The interface node to compute the result for
 * @param bundles The bundles to obtain the data from
 * @param context The context to obtain plugins from
 * @param hook The hook to subscribe to changes
 * @returns The output if it could be obtained
 * @throws An `CycleError` in case used nodes caused a dependency cycle
 */
export function evaluate<I, O>(
    interfaceNode: IInterfaceNode<I, O>,
    bundles: ISubscribable<IBindingBundle[]>,
    context?: IPluginContext,
    hook?: IDataHook
): O {
    const parentBindings = createParentBindings(bundles, hook);
    const tree = createDependencyGraph(parentBindings, interfaceNode, context ?? defaultContext, hook);
    const ordering = createOrdering(tree);
    if ("cycle" in ordering) throw new CycleError(ordering.cycle);
    const result = reduceOrdering(ordering, hook);
    return result;
}
