declare interface TableColumn {
  title: string;
  name: string;
  width?: number;
  align?: string;
  sortable?: boolean;
}

declare interface TableDialog {
  title: string;
  content: string;
  bool: boolean;
}

declare interface Table<T, W> {
  columns: TableColumn[],
  status: boolean,
  page: number,
  size: number,
  total: number,
  data: T[],
  search?: W,
  dialog?: TableDialog
}

declare interface JurisdictionInterfaceData {

}

declare interface JurisdictionInterfaceDataSearch {

}

declare interface TableUserData {

}

declare interface TableUserDataSearch {
  content: string;
}
