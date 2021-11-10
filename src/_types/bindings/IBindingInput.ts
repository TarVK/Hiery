import {ISubscribable} from "../utils/ISubscribable";

/** The possible input data types for a binding */
export type IBindingInput<I> = I | {subscribable: ISubscribable<I>};
