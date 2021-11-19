import {IDataHook} from "model-react";
import {IParentBindingData} from "../_types/bindings/IParentBindingData";
import {IPluginContext} from "../_types/context/IPluginContext";
import {IAnyNode} from "../_types/nodes/IAnyNode";
import {IInterfaceNode} from "../_types/nodes/types/IInterfaceNode";
import {
    ICollectBindingsDependencyNode,
    IComputeAlternativesDependencyNode,
    IComputeBindingsDependencyNode,
    IComputePriorityDependencyNode,
    IComputeResultDependencyNode,
    IDependencyNode,
    IDivideBindingsDependencyNode,
} from "./_types/IDependencyNode";
import {
    IAlternativeChildTreeNode,
    IAlternativePriorityTreeNode,
    IChildTreeNode,
    IInterfaceTreeNode,
    ITreeNode,
} from "./_types/ITreenode";

/**
 * Creates a tree with the given target as the root, with all nodes derived from the binding bundles
 * @param bindingMap All the bindings to obtain the complete tree from
 * @param target The target interface to use as the root of the tree
 * @param context The plugin context to be used to obtain sibling nodes from
 * @param hook The hook to subscribe to changes
 * @returns The root node of the tree
 */
export function createDependencyGraph<T>(
    bindings: Map<IAnyNode<any>, IParentBindingData<any>[]>,
    target: IInterfaceNode<T, any>,
    context: IPluginContext,
    hook?: IDataHook
): IComputeResultDependencyNode {
    return null as any; // TODO:
}

/**
 * Creates all trees from the given binding bundles
 * @param bindingMap All the bindings to obtain the complete tree from
 * @param context The plugin context to be used to obtain sibling nodes from
 * @param hook The hook to subscribe to changes
 * @returns The roots of all the created computation trees
 */
export function createDependencyGraphs(
    bindingMap: Map<IAnyNode<any>, IParentBindingData<any>[]>,
    context: IPluginContext,
    hook?: IDataHook
): IComputeResultDependencyNode[] {
    const resultNodes: IComputeResultDependencyNode[] = [];
    const nodes: IDependencyNode[] = [];
    const nodesMap = new Map<IAnyNode<any>, IInitNodes>();

    /**
     * Creates the required dependency nodes for the given hiery node, or adds the specified bindings to the node if the dependency nodes already exists
     * @param node The Hiery node to create the dependency nodes for
     * @param bindings The bindings to add to the collectBindings dependency node
     */
    const createDependencyNode = (node: IAnyNode<any>, bindings?: IParentBindingData<any>[]): IInitNodes => {
        let initNodes = nodesMap.get(node);
        if (initNodes) {
            // If the node already exists, potentially add the bindings, and then return the nodes
            if (bindings) initNodes.base.directBindings.push(...bindings);
            return initNodes;
        }

        let collectBindingsNode: ICollectBindingsDependencyNode;
        if ("parents" in node && "sibling" in node) {
            // The node is a sibling node, so copy the collectBindings node from its sibling
            const siblingNodes = createDependencyNode(node.sibling);
            collectBindingsNode = siblingNodes.base;
        } else {
            collectBindingsNode = {
                type: "collectBindings",
                node,
                dependencies: [],
                bindingNodes: [],
                directBindings: bindings ?? [],
            };
            nodes.push(collectBindingsNode);
        }

        initNodes = {
            alternativesCollection: [],
            base: collectBindingsNode,
        };

        // Node is an alternatives node
        if ("targets" in node) {
        }
        // Node is sibling/transformer node
        else if ("parents" in node) {
            const computeBindingsNode: IComputeBindingsDependencyNode = {
                type: "computeBindings",
                node,
                bindingsNode: collectBindingsNode,
                dependencies: [collectBindingsNode],
            };
            nodes.push(computeBindingsNode);
            node.parents.forEach(parent => {
                const parentNode = createDependencyNode(parent).base;
                parentNode.bindingNodes.push(computeBindingsNode);
                parentNode.dependencies.push(computeBindingsNode);
            });
        }
        // Node is an interface node
        else {
            const resultNode: IComputeResultDependencyNode = {
                type: "computeResult",
                node,
                bindingsNode: collectBindingsNode,
                dependencies: [collectBindingsNode],
            };
            resultNodes.push(resultNode);
            nodes.push(resultNode);
        }

        return initNodes;
    };

    // Compute all nodes recursively, starting at the binding nodes
    for (let [node, bindings] of bindingMap) {
        createDependencyNode(node, bindings);
    }

    return resultNodes;
}

type IInitNodes = {
    alternativesCollection: {
        priority: number;
        divideNode: IDivideBindingsDependencyNode;
        collectNode: ICollectBindingsDependencyNode;
    }[];
    base: ICollectBindingsDependencyNode;
};

// /**
//  * Creates all trees from the given binding bundles
//  * @param bindingMap All the bindings to obtain the complete tree from
//  * @param context The plugin context to be used to obtain sibling nodes from
//  * @param hook The hook to subscribe to changes
//  * @returns The roots of all the created computation trees
//  */
// export function createDependencyGraphs(
//     bindingMap: Map<IAnyNode<any>, IParentBindingData<any>[]>,
//     context: IPluginContext,
//     hook?: IDataHook
// ): IComputeResultDependencyNode[] {
//     const nodes: IDependencyNode[] = [];

//     const nodesMap = new Map<IAnyNode<any>, IInitNodes>();

//     /**
//      * Creates the required dependency nodes for the given hiery node, or adds the specified bindings to the node if the dependency nodes already exists
//      * @param node The Hiery node to create the dependency nodes for
//      * @param bindings The bindings to add to the collectBindings dependency node
//      */
//     const createDependencyNode = (node: IAnyNode<any>, bindings?: IParentBindingData<any>[]): IInitNodes => {
//         let initNodes = nodesMap.get(node);
//         if (initNodes) {
//             // If the node already exists, potentially add the bindings, and then return the nodes
//             if (bindings) initNodes.collectNode.directBindings.push(...bindings);
//             return initNodes;
//         }

//         // Add the collect bindings node
//         let collectBindingsNode: ICollectBindingsDependencyNode;
//         if ("parents" in node && "sibling" in node) {
//             // The node is a sibling node, so copy the collectBindings node from its sibling
//             const siblingNodes = createDependencyNode(node.sibling);
//             collectBindingsNode = siblingNodes.collectNode;
//         } else {
//             collectBindingsNode = {
//                 type: "collectBindings",
//                 node,
//                 dependencies: [],
//                 bindingNodes: [],
//                 directBindings: bindings ?? [],
//             };
//             nodes.push(collectBindingsNode);
//         }

//         // Add remaining init nodes and store it
//         const divideBindingsNode: IDivideBindingsDependencyNode = {
//             type: "divideBindings",
//             node,
//             bindingsNode: collectBindingsNode,
//             dependencies: [collectBindingsNode],
//             alternativeNodes: [],
//         };
//         nodes.push(divideBindingsNode);

//         initNodes = [{
//             priority: 0,
//             collectNode: collectBindingsNode,
//             divideNode: divideBindingsNode,
//         }];
//         nodesMap.set(node, initNodes);

//         // Node is an alternatives node
//         if ("targets" in node) {
//             const targetInitNodes = node.targets.map(target => createDependencyNode(target));
//             const collectBindingsTargetNodes = targetInitNodes.map(target => target.collectNode);
//             const divideBindingsTargetNodes = targetInitNodes.map(target => target.divideNode);
//             const computePrioritiesNode: IComputePriorityDependencyNode = {
//                 type: "computePriority",
//                 node,
//                 dependencies: [divideBindingsNode, ...collectBindingsTargetNodes],
//                 bindingsNode: divideBindingsNode,
//                 targetNodes: collectBindingsTargetNodes,
//             };
//             const computeAlternativesNode: IComputeAlternativesDependencyNode = {
//                 type: "computeAlternatives",
//                 node,
//                 dependencies: [computePrioritiesNode, ...divideBindingsTargetNodes],
//                 priorityNode: computePrioritiesNode,
//                 targetNodes: divideBindingsTargetNodes,
//             };
//             nodes.push(computePrioritiesNode, computeAlternativesNode);
//             divideBindingsTargetNodes.forEach(divideBindingTarget => {
//                 divideBindingTarget.dependencies.push(computePrioritiesNode);
//                 divideBindingTarget.alternativeNodes.push(computePrioritiesNode);
//             });

//             /* Add dependencies to the created nodes */
//             divideBindingsTargetNodes.forEach(divideBindingsTargetNode => {
//                 divideBindingsTargetNode.dependencies.push(computePrioritiesNode);
//                 divideBindingsTargetNode.alternativeNodes.push(computePrioritiesNode);
//             });
//             const parentInitNodes = node.parents.map(parent => createDependencyNode(parent));
//             const isTargetParent = node.parents.map(parent => node.targets.includes(parent));
//             const normalParentInitNodes = parentInitNodes.filter((_, i) => !isTargetParent[i]);
//             const targetParentInitNodes = parentInitNodes.filter((_, i) => isTargetParent[i]);
//             // For parents that are both targets and parents, we have to add the results to "collectAlternativeBindings" nodes, since the "collectBindings" phase of the parent already ended
//             normalParentInitNodes.forEach(parent => {
//                 const collectNode = parent.collectNode;
//                 collectNode.dependencies.push(computeAlternativesNode);
//                 collectNode.bindingNodes.push(computeAlternativesNode);
//             });
//             targetParentInitNodes.forEach(parent => {
//                 const collectAlternativesNode = parent.collectAlternativesNode;
//                 collectAlternativesNode.dependencies.push(computeAlternativesNode);
//                 collectAlternativesNode.alternativeNodes.push(computeAlternativesNode);
//             });
//         }
//         // Node is sibling/transformer node
//         else if ("parents" in node) {
//             const computeBindingsNode: IComputeBindingsDependencyNode = {
//                 type: "computeBindings",
//                 node,
//                 dependencies: [divideBindingsNode],
//                 bindingsNode: divideBindingsNode,
//             };
//             nodes.push(computeBindingsNode);
//         }
//         // Node is an interface node
//         else {
//             const computeResultNode: IComputeResultDependencyNode = {
//                 type: "computeResult",
//                 node,
//                 dependencies: [divideBindingsNode],
//                 bindingsNode: divideBindingsNode,
//             };
//             nodes.push(computeResultNode);
//         }

//         return initNodes;
//     };

//     for (let [node, bindings] of bindingMap) {
//         createDependencyNode(node, bindings);
//     }
// }

// type IInitNodes = {
//     priority: number;
//     collectNode: ICollectBindingsDependencyNode;
//     divideNode: IDivideBindingsDependencyNode;
// }[];

// /**
//  * Creates all trees from the given binding bundles
//  * @param bindingMap All the bindings to obtain the complete tree from
//  * @param context The plugin context to be used to obtain sibling nodes from
//  * @param hook The hook to subscribe to changes
//  * @returns The roots of all the created computation trees
//  */
// export function createDependencyGraphs(
//     bindingMap: Map<IAnyNode<any>, IParentBindingData<any>[]>,
//     context: IPluginContext,
//     hook?: IDataHook
// ): ITreeNode[] {
//     // Keep a quick lookup map of the nodes
//     const map = new Map<IAnyNode<any>, IInterfaceTreeNode<any> | IChildTreeNode<any> | IAlternativePriorityTreeNode<any>>();

//     // Collect all the nodes of the correct shape, without worrying about having the correct children
//     const nodes: ITreeNode[] = [...bindingMap.entries()].flatMap<ITreeNode>(([node, bindings]) => {
//         if ("targets" in node) {
//             const priorityNode = {
//                 node,
//                 itemsBindings: bindings,
//                 type: "alternativePriority" as const,
//                 dependencies: [],
//                 dataChildren: [],
//             };
//             const alternativeNode = {
//                 node,
//                 type: "alternativeChild" as const,
//                 dependencies: [priorityNode],
//                 getterNode: priorityNode,
//                 targetChildren: [],
//             };
//             map.set(node, priorityNode);
//             return [priorityNode, alternativeNode];
//         }
//         if ("parents" in node) {
//             const childNode = {
//                 node,
//                 itemsBindings: bindings,
//                 type: "child" as const,
//                 dependencies: [],
//                 dataChildren: [],
//             };
//             map.set(node, childNode);
//             return [childNode];
//         }

//         const interfaceNode = {
//             node,
//             itemsBindings: bindings,
//             type: "interface" as const,
//             dependencies: [],
//             dataChildren: [],
//         };
//         map.set(node, interfaceNode);
//         return [interfaceNode];
//     });

//     // Properly setup up the child relations
//     for (let treeNode of nodes) {
//         if (treeNode.type == "child") {
//             for (let parent of treeNode.node.parents) {
//                 const parentTreeNode = map.get(parent);
//                 parentTreeNode?.dependencies.push(treeNode);
//                 parentTreeNode?.dataChildren.push(treeNode);
//             }
//         } else if (treeNode.type == "alternativePriority") {
//             for (let parent of treeNode.node.parents) map.get(parent)?.dependencies.push(treeNode);
//         } else if (treeNode.type == "alternativeChild") {
//             for (let target of treeNode.node.targets) {
//                 map.get(target)?.dependencies.push(treeNode);
//             }
//         }
//     }
// }
