export type Column<T> = {
  key: keyof T;
  label: string;
};

export type TableDataEntry = { id: string } & Record<string, unknown>;

export type TableData = Array<TableDataEntry>;

export type SortDirection = 'asc' | 'desc';

export type SortableTableColumn<T> = {
  key: keyof T;
  label: string;
};

export type SortableTable<T> = {
  data: T[];
  columns: SortableTableColumn<T>[];
  defaultSortDirection?: SortDirection;
  defaultSortColumn?: keyof T;
};
