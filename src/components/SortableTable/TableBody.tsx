import { Column, TableDataEntry } from '@customTypes/table';
import { ReactNode } from 'react';

function TableBody<T extends TableDataEntry>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {
  return (
    <tbody>
      {data.map((dataObj, rowIndex) => (
        <tr key={dataObj.id}>
          {columns.map(({ key, label }, columnIndex) => (
            <td
              key={`${rowIndex}${columnIndex}${String(key)}`}
              data-label={label}
            >
              {dataObj[key as keyof typeof dataObj] as ReactNode}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
