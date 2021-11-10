import {IBindingData} from "../_types/bindings/IBindingData";
import {IParentBindingData} from "../_types/bindings/IParentBindingData";

/**
 * Type checks the given parent binding data
 * @param config The configuration for the binding
 * @returns The configuration
 */
export function bindParent<T>(config: IParentBindingData<T>): IParentBindingData<T> {
    return config;
}
