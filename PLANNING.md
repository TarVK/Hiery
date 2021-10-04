# Summary
Summary of changes compared to LM's action system:
- The first argument of the core will still be a list of the pure input data `T`, but the second argument will a list of the following type:
    ```ts
    type IBindingData<T> = {
        data: T,
        index: number,
        sources: Set<IActionTarget>
    };
    ```
    - We also should consider whether to maybe enforce data to be retriever functions (Comparable to lazy evaluation), to reduce the amount of unnecessary computed data
        ```ts
        type IBindingData<T> = {
            data: (hook: IDataHook)=>T,
            index: number,
            sources: Set<IActionTarget>
        };
        ```

- what was priorly known as an action, will be separated into 3 different node types:
    - interfaces: Used as top level nodes, such as `contextMenuAction` in LM. Basically nodes that don't define relationships to any other node
    - combiners: Used as hierarchical nodes to combine its own bindings into bindings of one or more parent nodes. Data can't be extract directly from this node, that will have to be done through interface nodes.
    - 

# Open questions/decisions to be made
- Names for each of the node types
- Change name of the repo/package?
- should data always be a retriever function