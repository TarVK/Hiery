import {IDataHook} from "model-react";
import {ISubscribable} from "../_types/utils/ISubscribable";

/**
 * Extracts the data from a data retriever if provided, or otherwise returns the input data
 * @param data The data that is either a data retriever or the raw data
 * @param hook The hook to subscribe to changes
 * @returns The data
 */
export function getHooked<T>(data: ISubscribable<T>, hook?: IDataHook): T {
    if (data instanceof Function) return data(hook);
    return data;
}
