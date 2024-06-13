export type Column = {
  key: string;
  label: string;
};

export type TableDataEntry = { id: string } & Record<string, unknown>;

export type TableData = Array<TableDataEntry>;
