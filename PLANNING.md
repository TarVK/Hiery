# Problem analyses of LM's action system

The following are the issues of LM's action system to be solved:

1. The name `action` no longer accurately reflects all capabilities (Hence we have to find better terms)
2. Certain actions such as search are hard to express with the action system, since the action system tries to separate the actionTargets (the items with the bindings) from the bindings themselves. However, the search action has to return the searched item itself, based on said binding. And if you include the item itself in the binding, you could no longer copy and modify an existing actionTarget, since it would still contain the old item in the binding.
3. The current action system doesn't allow for plugins to later inject behavior on existing data, even though sometimes the data provided by an actionTarget itself is sufficient to add more behavior.

# Solution overview

1. TODO: Come up with better terminology. And once done, replace `action` with said term throughout this document
2. Change the signature into the following:
    ```ts
    type ITransform = <T>(
        data: T[],
        bindings: {
            data: T;
            index: number;
            sources: Set<IActionTarget>;
        }[]
    )=> ...
    ```
    While keeping:
    ```ts
    type IActionBinding<I> = {
        // Names will be changed, should no longer be action related
        action: IAction<I>;
        data: I;
    };
    ```
    Then when an action is executed, the source of a binding will be combined with the binding before passing it to the core function.
3. Add a function `addSibling` to every action, that allows you to add a 'sibling' action S to an existing action A. This will result in all bindings of A being forwarded to S, and thus S being usable on items that had a binding to A. S can then define any parents as it usually would, but no bindings have to (or even can be) created directly for S.

    Additionally we would want the ability to remove bindings based on this new node too. So this action S can indicate to be an alternative to an action X. Then for any binding B that X receives, B will be passed through all alternatives to check if they want to be an alternative for this binding (based on the source items). If an alternative was found, the original binding X is blocked. Any for any possible alternative S, its binding is only outputted if it was indicated to be an alternative for one of the same source items.

# Summary

Summary of changes compared to LM's action system:

-   The first argument of the core will still be a list of the pure input data `T`, but the second argument will a list of the following type:

    ```ts
    type IBindingData<T> = {
        data: T;
        index: number;
        sources: Set<IActionTarget>;
    };
    ```

    -   We also should consider whether to maybe enforce data to be retriever functions (Comparable to lazy evaluation), to reduce the amount of unnecessary computed data
        ```ts
        type IBindingData<T> = {
            data: (hook: IDataHook) => T;
            index: number;
            sources: Set<IActionTarget>;
        };
        ```

-   what was priorly known as an action, will be separated into 3 different node types:
    -   interfaces: Used as top level nodes, such as `contextMenuAction` in LM. Basically nodes that don't define relationships to any other node
    -   combiners: Used as hierarchical nodes to combine its own bindings into bindings of one or more parent nodes. Data can't be extract directly from this node, that will have to be done through interface nodes.
    -   plugins: Used to inject behavior based on already defined bindings of data, by registering the plugin node to be a 'sibling' of another node, meaning it receives all of the same input bindings. Additionally it will be able to indicate it's an alternative for an existing node X, blocking X from forwarding its data.

# Open questions/decisions to be made

-   Names for each of the node types
-   Change name of the repo/package?
-   should data always be a retriever function?
