/** A type such that typescript can't infer the type of K based on an assigned value */
export type TDerived<K> = K extends infer Y ? Y : never;
