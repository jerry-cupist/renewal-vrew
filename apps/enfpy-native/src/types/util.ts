export type StartWith<
  Types extends string,
  PrefixType extends string,
> = Types extends `${PrefixType}${string}` ? Types : never
