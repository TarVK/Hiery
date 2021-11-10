import {createTransformerNode} from "./nodes/createTransformerNode";
import {createInterfaceNode} from "./nodes/createInterfaceNode";
import {bindParent} from "./utils/bindParent";

const getText = createInterfaceNode({
    name: "getText",
    combine: (data: string[]) => data.join(","),
});

const item1 = [getText.bind("hoi")];
const item2 = [getText.bind("potato"), getText.bind("peel")];
const result = getText([item1, item2]); // "hoi,potato,peel"

const getMax = createInterfaceNode({
    name: "getMax",
    combine: (data: number[]) => data.reduce((a, b) => Math.max(a, b), -Infinity),
});

const wordCombiner = createTransformerNode({
    name: "wordCombiner",
    parents: [getText],
    transform: (texts: string[], bindings) => [
        bindParent({
            node: getText,
            data: texts.join(" "),
            index: bindings[0].index,
            sources: new Set(bindings.reduce((allSources, {sources}) => [...allSources, ...sources], [])),
        }),
    ],
});
