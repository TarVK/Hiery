import {IBinding} from "./IBinding";
import {ISubscribable} from "../utils/ISubscribable";

/** The symbol to store binding bundles under in an object */
export const bindingsBundle = Symbol("Hiery bindings");

/** The data type that interface nodes can extract data from */
export type IBindingBundle = ISubscribable<IBinding<any>[]> | IBindingBundleObject;

export type IBindingBundleObject = {
    [bindingsBundle]: ISubscribable<IBinding<any>[]>;
};
