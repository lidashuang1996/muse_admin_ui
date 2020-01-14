// 默认的不带参数的 StoreMutation
declare interface BaseStoreMutation {
  (): void;
}

// 携带参数的 StoreMutation
declare interface StoreMutation<T> {
  (constructor: T): void;
}

// 菜单的类型
declare type MenuStore = MenuStoreItem[];
declare interface MenuStoreItem {
  name: string; // 路径
  title: string; // 标题
  ico: MenuStoreItemIco; // ICO
  children?: MenuStoreItem[]; // 子类--> 只显示一级子类
}
declare interface MenuStoreItemIco {
  class?: string; // ICO CLASS
  content: string; // ICO 内容
}

declare interface IndexMenuStore {
  x: number;
  y: number
}

declare type MenuStoreMutation = StoreMutation<MenuStore>
declare type IsMenuFoldStoreMutation = BaseStoreMutation;
declare type IndexMenuStoreMutation = StoreMutation<IndexMenuStore>;
