import {IDataRetriever} from "model-react";

/** Some data that may be purely the data itself, or may be a data retriever function */
export type ISubscribable<T> = T | IDataRetriever<T>;
