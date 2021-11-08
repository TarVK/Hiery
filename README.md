# Hiery

A library to create functions that can be executed on a collection of items at once, while remaining flexible by using a hierarchical node system.

## When should you consider using Hiery?

Whenever you have any kind of data selection, with shared behavior. E.g.

-   A context menu on a selection of items
-   A UI that shows common inputs/options based on a selection of items

Hiery is especially useful for when you're in the above situation, and want to allow third-party plugins to customize behavior. This is supported in two ways:

-   If a third party provides item types for in your software, they can fully customize how it's presented by your software and how shared behavior works
-   A third party can adjust behavior of existing items within your software, as long as the items contain sufficient raw data to do so

## Why would you consider using Hiery?

Because despite being able to get the same results quite easily without using the functionality Hiery provides, it will most likely become harder to maintain. Initially grasping the concept of Hiery may be harder than just writing something from scratch yourself, but Hiery is designed to be very modular and flexible, such that your codebase remains easily maintainable no matter how complex the shared selection behavior gets.

This is especially true when you want to support new shared selection behavior defined by third parties. By using Hiery everything stays very open ended, such that third-party plugins have the freedom to do what they want without having to ask you to implement new features in order to support their ideas.

## How does it work?

It doesn't, not yet.

With Hiery you will essentially build a hierarchical graph (more precisely a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)) of behavior.

TODO: finish explaination by finding an appropriate example
