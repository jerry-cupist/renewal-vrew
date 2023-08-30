import store, {
  DeveloperTools,
  EachFn,
  Replacer,
  Reviver,
  StoredData,
  TransactFn,
} from "store2";

type LocalStorageKey = "token";

type SessionStorageKey = "SessionTestKey";
type PageStorageKey = "PageTestKey";

export interface CustomStoreAPI<KeyType extends string = string> {
  clear(): CustomStoreAPI<KeyType>;
  clearAll(): CustomStoreAPI<KeyType>;
  each(callback: EachFn): CustomStoreAPI<KeyType>;
  get(key: KeyType, alt?: any | Reviver): any;
  getAll(fillObj?: StoredData): StoredData;
  has(key: KeyType): boolean;
  isFake(force?: boolean): boolean;
  keys(fillList?: string[]): string[];
  namespace(namespace: string, singleArea?: true, delim?: string): StoreType;
  remove(key: KeyType, alt?: any | Reviver): any;
  set(key: KeyType, data: any, overwrite?: boolean | Replacer): any;
  setAll(data: Object, overwrite?: boolean | Replacer): StoredData;
  add(key: KeyType, data: any): any;
  size(): number;
  transact(
    key: KeyType,
    fn: TransactFn,
    alt?: any | Reviver
  ): CustomStoreAPI<KeyType>;
  area(id: string, area: Storage): CustomStoreAPI<KeyType>;
}

export type StoreType = CustomStoreAPI<LocalStorageKey> & {
  local: CustomStoreAPI<LocalStorageKey>;
  session: CustomStoreAPI<SessionStorageKey>;
  page: CustomStoreAPI<PageStorageKey>;
  readonly _: DeveloperTools;
};

const storeUtil = store as StoreType;

export default storeUtil;
