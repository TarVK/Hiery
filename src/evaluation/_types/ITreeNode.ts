import {IBindingData} from "../../_types/bindings/IBindingData";
import {IParentBindingData} from "../../_types/bindings/IParentBindingData";
import {IAlternativeNode, IAlternativeNodeFunctions} from "../../_types/nodes/types/IAlternativeNode";
import {IInterfaceNode} from "../../_types/nodes/types/IInterfaceNode";
import {ISiblingNode} from "../../_types/nodes/types/ISiblingNode";
import {ITransformerNode} from "../../_types/nodes/types/ITransformerNode";

/** The tree node that were derived from the bindings */
export type ITreeNode<T = any> =
    | IInterfaceTreeNode<T>
    | IChildTreeNode<T>
    | IAlternativePriorityTreeNode<T>
    | IAlternativeChildTreeNode<T>;

export type IInterfaceTreeNode<T> = {
    /** The child dependency nodes */
    dependencies: ITreeNode[];
    /** The Hiery node is an interface node */
    type: "interface";
    /** The Hiery node that this tree node is for */
    node: IInterfaceNode<T, any>;
    /** The output of the node */
    result?: any;
    /** The bindings that items contained for this node */
    itemsBindings: IParentBindingData<T>[];
    /** The children that provide bindings for this node */
    dataChildren: ITreeNode[];
};
export type IChildTreeNode<T> = {
    /** The child dependency nodes */
    dependencies: ITreeNode[];
    /** The Hiery node is a child for a parent binding */
    type: "child";
    /** The Hiery node that this tree node is for */
    node: ISiblingNode<T, any> | ITransformerNode<T, any>;
    /** The bindings for the parents of the node */
    result?: IChildOutput<T>;
    /** The bindings that items contained for this node */
    itemsBindings: IParentBindingData<T>[];
    /** The children that provide bindings for this node */
    dataChildren: ITreeNode[];
};
export type IAlternativePriorityTreeNode<T> = {
    /** The child dependency nodes */
    dependencies: ITreeNode[];
    /** The Hiery node is meant to rate whether to be used as an alternative */
    type: "alternativePriority";
    /** The Hiery node that this tree node is for */
    node: IAlternativeNode<T, any, any>;
    /** The result of the deciding whether to use the alternative */
    result?: {
        /** The priority ratings for the target bindings */
        priorities: Map<IBindingData<any>, number>; // TODO: replace number with priority
        /** The functions that were used for ratings, and can be used for getting result */
        functions: IAlternativeNodeFunctions<any, any>;
    };
    /** The bindings that items contained for this node */
    itemsBindings: IParentBindingData<T>[];
    /** The children that provide bindings for this node */
    dataChildren: ITreeNode[];
};
export type IAlternativeChildTreeNode<T> = {
    /** The child dependency nodes */
    dependencies: ITreeNode[];
    /** The Hiery node that this tree node is for */
    node: IAlternativeNode<T, any, any>;
    /**The Hiery node is meant to create bindings based on matched alternatives */
    type: "alternativeChild";
    /** The bindings for the parents of the node */
    result?: IChildOutput<T>;
    /** The tree node that provides the getter function */
    getterNode: ITreeNode<T>;
    /** THe nodes that were targeted to provide alternatives for */
    targetChildren: ITreeNode[];
};

type IChildOutput<T> = {
    /** The output bindings of the node */
    bindings: IParentBindingData<any>[];
    /** Bindings for which an alternative node was chosen to be used */
    alternatives: Map<ITreeNode<T>, IParentBindingData<T>[]>;
};
