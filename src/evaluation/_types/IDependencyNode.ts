import {IBindingData} from "../../_types/bindings/IBindingData";
import {IParentBindingData} from "../../_types/bindings/IParentBindingData";
import {IAnyNode} from "../../_types/nodes/IAnyNode";
import {IAlternativeNodeFunctions} from "../../_types/nodes/types/IAlternativeNode";

/** All the types f dependency nodes */
export type IDependencyNode =
    | ICollectBindingsDependencyNode
    | IDivideBindingsDependencyNode
    | IComputeBindingsDependencyNode
    | IComputeResultDependencyNode
    | IComputePriorityDependencyNode
    | IComputeAlternativesDependencyNode;

/** All possible child dependency nodes */
export type IChildDependencyNode =
    | IComputeBindingsDependencyNode
    | IComputeAlternativesDependencyNode
    | IDivideBindingsDependencyNode;

/** The node responsible for collecting the bindings for a given node */
export type ICollectBindingsDependencyNode = {
    /** The type of the dependency node, collect bindings for a node */
    type: "collectBindings";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The nodes that could have bindings for this node */
    bindingNodes: IChildDependencyNode[];
    /** The direct bindings for this node */
    directBindings: IParentBindingData<any>[];
    /** The bindings that this node resulted in */
    output?: {
        /** The bindings to be used for a node */
        bindings: IBindingData<any>[];
    };
};

/** A node responsible for dividing the bindings for a given node amongst a node's alternatives */
export type IDivideBindingsDependencyNode = {
    /** The type of the dependency node, dividing bindings of a node */
    type: "divideBindings";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The node that collects the bindings */
    bindingsNode: ICollectBindingsDependencyNode;
    /** All the alternatives for this node */
    alternativeNodes: IComputePriorityDependencyNode[];
    /** The bindings that this node resulted in */
    output?: {
        /** The bindings to be used for a node */
        bindings: IParentBindingData<any>[];
        /** The bindings that were chosen to be replaced by alternatives from other nodes */
        alternatives: Map<never, IBindingData<any>[]>;
    };
};

/** A node responsible for computing bindings for parent nodes */
export type IComputeBindingsDependencyNode = {
    /**  The type of the dependency node, compute the bindings for a parent */
    type: "computeBindings";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The node that contains all the bindings to be used */
    bindingsNode: ICollectBindingsDependencyNode;
    /** The bindings that were computed */
    output?: {
        /** The output bindings */
        bindings: IParentBindingData<any>[];
    };
};

/** A node responsible for computing the final result of a graph */
export type IComputeResultDependencyNode = {
    /** THe type of the dependency node, compute the result of this graph */
    type: "computeResult";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The node that contains all the bindings to be used */
    bindingsNode: ICollectBindingsDependencyNode;
    /** The bindings that were computed */
    output?: any;
};

/** A node responsible for computing the priorities for an alternative node */
export type IComputePriorityDependencyNode = {
    /** The type of the dependency node, compute the priority of the alternative node */
    type: "computePriority";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The node to retrieve the bindings */
    bindingsNode: IDivideBindingsDependencyNode;
    /** The bindings of the target nodes, note these aren't computational dependencies */
    targetNodes: ICollectBindingsDependencyNode[];
    /** The functions and priorities this node resulted in */
    output?: {
        /** The priority ratings for the target bindings */
        priorities: Map<IBindingData<any>, number>; // TODO: replace number with priority
        /** The functions that were used for ratings, and can be used for getting result */
        functions: IAlternativeNodeFunctions<any, any>;
    };
};

/**A node responsible for computing the bindings for parent nodes, from an alternative node */
export type IComputeAlternativesDependencyNode = {
    /** The type of the the dependency node, computes the alternatives */
    type: "computeAlternatives";
    /** The Hiery node that this dependency node is part of */
    node: IAnyNode<any>;
    /** The dependencies of this node */
    dependencies: IDependencyNode[];
    /** The node to compute priority dependencies */
    priorityNode: IComputePriorityDependencyNode;
    /** The nodes that contain bindings this node should compute alternatives for */
    targetNodes: IDivideBindingsDependencyNode[];
    /** The parent bindings this node created  */
    output?: {
        /** The output bindings */
        bindings: IParentBindingData<any>[];
    };
};
